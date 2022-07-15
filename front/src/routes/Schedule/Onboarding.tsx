import $ from "jquery";
import GuideChimp from "guidechimp";
import "guidechimp/dist/guidechimp.min.css";
import "./Calendar.css";
import moment from "moment";
import { setCookie } from "./Cookies";

const description = [
  {
    title: "Pill my rhythm의 스케쥴러 기능에 오신 것을 환영합니다.",
    description: "자유롭게 일정을 생성하고 관리해보세요.",
    buttons: [
      {
        tagName: "div",
        title: '<input type="checkbox" id="never-show-up-today" /><p>오늘 하루 더이상 보이지 않기</p>',
        class: "onboarding-checkbox",
      },
      {
        tagName: "div",
        title:
          '<button id="popout-button" class="p-1 text-sm text-teal-600 font-semibold rounded-lg border border-teal-200 hover:text-white hover:bg-teal-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">닫기</button>',
        class: "popout",
        onClick: function () {
          const isChecked = $('input:checkbox[id="never-show-up-today"]').is(":checked");
          if (isChecked) {
            // const expires: Date = moment().add(1, "minutes").toDate();
            const expires: Date = moment().endOf("day").toDate();
            console.log(expires);
            setCookie("never-show-up-today", isChecked, { path: "/", expires });
          }
          guidechimp.stop();
        },
      },
    ],
  },
  {
    element: "#subscribeService",
    title: "구독 서비스 이용하기",
    description: "Web과 Android 환경에서 각각 구독 신청 후 영양제 알림 서비스를 받아보실 수 있습니다.",
  },
  {
    element: "#supplementsDnDService",
    title: "영양제 일정",
    description: "영양제 복용 시간을 드래그앤드롭으로 설정할 수 있습니다.",
  },
  {
    element: 'label[for="modal-아침"]',
    title: "영양제 추가/삭제하기",
    description: "각각의 시간을 클릭해 북마크 한 영양제들을 추가할 수 있고, 추가된 영양제는 클릭해서 삭제할 수 있습니다.",
  },
  {
    element: "#biorhythmsDnDService",
    title: "생체리듬 개선 활동",
    description: "생체리듬 개선에 좋은 활동들을 드래그앤드롭으로 설정할 수 있습니다.",
  },
  {
    element: "#CalendarWrapper",
    title: "스케쥴러",
    description: "오전 6시부터 밤 12시까지 일정을 추가하고 삭제할 수 있습니다.",
  },
  {
    element: 'label[id="checklistArea"]',
    title: "체크리스트 작성",
    description: "날짜를 클릭하면 오늘의 활동들을 잘 이행했는지 체크리스트를 작성할 수 있습니다.",
  },
];

export const guidechimp = GuideChimp(description);
