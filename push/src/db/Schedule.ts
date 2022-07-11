import { Op, col } from "./models";
import { Users } from "./models/user";
import { Schedules } from "./models/schedule";
import { Subscribes } from "./models/subscribe";
import { DailySupplements } from "./models/dailySupplement";
import { Supplements } from "./models/supplement";

const Schedule = {
  findByOnlyTime: async (time: Date) => {
    const supplementSchedules = await Schedules.findAll({
      attributes: ["to_do"],
      where: { type: "S", start: time },
      include: {
        required: true, // inner join
        model: Users,
        attributes: ["pk_user_id", "user_name", "email"],
        include: [
          {
            required: true, // inner join
            model: Subscribes,
            attributes: ["device_token"],
          },
          {
            required: false, // outer join, 영양제 일정만 있는 회원 정보도 불러오기
            model: DailySupplements,
            attributes: ["fk_supplement_id"],
            where: {
              "$User.DailySupplements.type$": {
                [Op.eq]: col("Schedules.to_do"),
              },
            },
            include: [
              {
                required: true, // inner join
                model: Supplements,
                attributes: ["name"],
              },
            ],
          },
        ],
      },
    });
    const supplementSchedulesData = supplementSchedules.map((element) =>
      element.get({ plain: true })
    );
    return supplementSchedulesData;
  },
};

export { Schedule };
