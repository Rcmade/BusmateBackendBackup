const RealTimeLocation = require("../models/realTimeLocation");
const User = require("../models/user");
const contributerData = require("../models/appUtility");
const { calculateDistance, dynamicSort } = require("../helpers/functions");

const { calculateWeightMs } = require("../helpers/MathFunctions");

const newLocation = async (req, res) => {
  const {
    latitude1: latitude,
    longitude1: longitude,
    busNumber,
    heading,
    ms,
    _id,
  } = req.body;

  // find to contributor how sitted in the bus
  const getCurrentContributor = await contributerData.findOne({ busNumber });
  // User Data
  // console.log({ _id, getCurrentContributor });
  // because after assigning the user we want to store data only who becomes a contributor from the assing method
  if (getCurrentContributor?.currentContributer?.toString() === _id) {
    console.log("Matches current contributor");
    await RealTimeLocation.create({
      latitude: +latitude || 0,
      longitude: +longitude || 0,
      busNumber,
      contributer: _id,
      heading: +heading || 0,
      ms,
    });
    return res.json({ previous: false, wait: false });
  } else {
    console.log("Not Matches current contributor");
    // find from the previous contributor because if current user is unavailable the we get location from the previous contributor
    const isPrevious = getCurrentContributor.previousFiveContributer.find(
      (data) => {
        // console.log(data.contributer, _id);
        return data.contributer?.toString() === _id;
      }
    );

    console.log({ isPrevious });
    if (isPrevious) {
      // await RealTimeLocation.create({

      return res.json({ previous: true, wait: true });
    } else {
      return res.json({ previous: true, wait: false, youAreDone: true });
    }
  }
};

const asignContributer = async (req, res) => {
  // Get Data from Body
  const { latitude1, longitude1, busNumber, weight, ms, _id } = req.body;
  // Finding the busNumber from database
  // console.log({ latitude1, longitude1, busNumber, weight, ms, _id });
  const findBusNo = await RealTimeLocation.find({ busNumber })
    .populate("contributer")
    .sort({
      createdAt: -1,
    });
  // console.log({
  //   findBusNo: findBusNo,
  //   contributer: findBusNo && findBusNo[0]?.contributer,
  // });
  // .limit(1)
  // IF there is no data present in database which means it is the first contributar for that bus
  if (!findBusNo.length) {
    console.log("inside length of buses");
    const createFirstContributer = await contributerData.create({
      busNumber,
      currentContributer: _id,
      // previousFiveContributer: [resetContributer],
    });

    return res.json({
      previous: false,
      contributer: createFirstContributer,
      assigned: true,
    });

    // If there is already have contributer to that bus then compare the weight
  } else if (findBusNo.length > 1) {
    const { latitude, longitude } = findBusNo[0];
    // Calculate the distance between the contributer and new user
    const distance = await calculateDistance(
      latitude1,
      latitude,
      longitude1,
      longitude
    );

    console.log(distance, "METER");
    // if the  distance is less than 300 the compare the weight
    if (+distance < 300) {
      const contributerWeight = findBusNo[0].contributer.weight;
      const contributerMs = findBusNo[0].ms;
      const getContributerWeight = calculateWeightMs(
        +contributerWeight,
        +contributerMs
      );

      // Calculate the weight between the ms(ping) and weight
      const getNewUserWeight = calculateWeightMs(+weight, +ms);
      console.log({
        contributerWeight,
        contributerMs,
        getContributerWeight,
        getNewUserWeight,
      });
      // if  new user has heigher weight as compare to the previous contributer
      if (getNewUserWeight > getContributerWeight) {
        // Update the appUtility database for convinence
        const getContributer = await contributerData.findOne({ busNumber });

        console.log({ getContributer });

        // Sort the contributors by their createdAt timestamp and remove the oldest contributors. here we want only five contributor
        const resetContributer =
          dynamicSort(getContributer.previousFiveContributer)?.length > 5
            ? dynamicSort(getContributer.previousFiveContributer).pop()
            : dynamicSort(getContributer.previousFiveContributer);

        console.log({
          resetContributer,
          getContributer: getContributer.previousFiveContributer,
        });
        // After sorting , currentContributor converted into privous  contributors and currentContributor will be the new contributors
        const updateContributer = await contributerData.findOneAndUpdate(
          {
            busNumber,
          },
          {
            $set: {
              // new Contributor
              currentContributer: _id,
              previousFiveContributer: [
                // Previous five contributor
                ...resetContributer,
                // Current contributor converted Into Previous Contributor
                {
                  contributer: getContributer.currentContributer,
                  createdAt: Date.now(),
                },
              ],
              busNumber: getContributer.busNumber,
              // createdAt: Date.now(),
            },
          },
          {
            // It will return the new contributor document
            new: true,
          }
        );

        console.log({ updateContributer, getContributer, resetContributer });
        return res.json({ previous: false, assigned: true });
      } else {
        return res.json({ previous: true, assigned: true });
      }
    } else if (+distance > 600) {
      // Reduce the weight of the user because the user sitted in the wrong bus or selected the wrong bus number
      const findUserToUpdate = await User.findById(_id);
      await User.findByIdAndUpdate(_id, {
        $set: {
          weight: +findUserToUpdate.weight - 0.05,
          updatedAt: findUserToUpdate.updatedAt,
        },
      });
      return res.json({ previous: false, assigned: true });
    } else {
      return res.json({ previous: false, assigned: true });
    }
  }
};

const getNewLocation = async (req, res) => {
  console.log("data", req.query);
  const { date, busNumber } = req.query;

  const getCurrentContributor = await RealTimeLocation.find({
    createdAt: { $gt: date },
    busNumber: +busNumber,
  })
    .sort({ createdAt: 1 })
    .select("-_id longitude latitude heading createdAt");
  // console.log({ getCurrentContributor });

  return res.json(getCurrentContributor);

  // res.json({ data: req.body });
};

const a = async () => {
  const getCurrentContributor = await contributerData.findOne({
    busNumber: 18,
  });

  const isPrevious = getCurrentContributor.previousFiveContributer.find(
    (data) => {
      console.log(data.contributer === "640fb8398d2d666319a7b000");
      return String(data.contributer) === "640fb8398d2d666319a7b000";
    }
  );

  console.log({ isPrevious });
};

// a();

module.exports = { newLocation, asignContributer, getNewLocation };
