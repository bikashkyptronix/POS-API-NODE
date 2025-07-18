import { Fuel } from "../../../models/Fuel.js";
import { Parser } from "json2csv";
import dayjs from "dayjs";

export const fuelListCSV = async (req, res, next) => {
  try {
    const condition = {
      status: "active",
      business_id: req.userDetails.business_id,
    };

    const getData = await Fuel.find(condition)
      .sort({ createdAt: -1 })
      .lean();

    const formattedData = getData.map(data => {
      const createdAt = dayjs(data.created_at);
      return {
        ID: data._id,
        BusinessID: data.business_id,
        RegularCash: data.regular_cash,
        RegularCredit: data.regular_credit,
        PlusCash: data.plus_cash,
        PlusCredit: data.plus_credit,
        PremiumCash: data.premium_cash,
        PremiumCredit: data.premium_credit,
        DieselCash: data.diesel_cash,
        DieselCredit: data.diesel_credit,
        Date: createdAt.format("DD.MM.YYYY"),
        Time: createdAt.format("hh:mm A"),
        Status: data.status,
      };
    });

    const fields = Object.keys(formattedData[0] || {});
    const parser = new Parser({ fields });
    const csv = parser.parse(formattedData);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="fuel_list_${Date.now()}.csv"`
    );

    return res.status(200).end(csv);
  } catch (error) {
    console.error("CSV Download Error:", error);
    next(error);
  }
};