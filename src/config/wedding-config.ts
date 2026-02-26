const uniqueIdentifier = "SKH-WEDDING-TEMPLATE-V1";

// 갤러리 레이아웃 타입 정의
type GalleryLayout = "scroll" | "grid";
type GalleryPosition = "middle" | "bottom";

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  // 메타 정보
  meta: {
    title: "성기호 💚 조민지의 결혼식에 초대합니다",
    description: "26년 4월 25일 오후 1시, 성북구 덕수교회",
    ogImage: "/images/gallery/t352120.webp",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/gallery/t352120.webp",
    date: "2026년 4월 25일 토요일 13시 0분",
    venue: "성북구 덕수교회",
  },

  // 소개글
  intro: {
    text: "서로를 바라보며 걸어온\n소중한 발걸음이\n이제 하나의 길로 이어집니다.\n\n사랑과 믿음으로\n새 가정을 이루는 저희 두 사람의\n작은 시작을 알려드립니다.",
  },

  // 결혼식 일정
  date: {
    year: 2026,
    month: 4,
    day: 25,
    hour: 13,
    minute: 0,
    displayDate: "2026.04.25 토요일 PM 13:00",
  },

  // 장소 정보
  venue: {
    name: "덕수교회",
    address: "서울 성북구 성북로 127\n덕수교회",
    tel: "02-741-5161",
    naverMapId: "덕수교회", // 네이버 지도 검색용 장소명
    coordinates: {
      latitude: 37.59439,
      longitude: 126.9925934,
    },
    placeId: "12085300", // 네이버 지도 장소 ID
    mapZoom: "17", // 지도 줌 레벨
    mapNaverCoordinates: "14137011,4522240,15,0,0,0,dh", // 네이버 지도 길찾기 URL용 좌표 파라미터 (구 형식)
    transportation: {
      subway: "4호선 한성대입구역 6번 출구에서 도보 20분",
      bus: "한성대입구역 6번출구. 삼선교 정류소\n지선\n1111, 1112, 2112\n마을\n성북02, 성북03",
    },
    parking:
      "교회 접근하셔서 주차 안내에 따라주세요(주차가 협소하니 가급적 대중교통을 이용해주시면 감사하겠습니다.)",
    // 신랑측 배차 안내
    groomShuttle: {
      location: "TODO 신랑측 배차 출발지",
      departureTime: "TODO 오전 10시 30분 출발",
      contact: {
        name: "담당자명",
        tel: "010-1234-5678",
      },
    },
    // 신부측 배차 안내
    brideShuttle: {
      location: "TODO 신부측 배차 출발지",
      departureTime: "TODO 오전 11시 출발",
      contact: {
        name: "담당자명",
        tel: "010-9876-5432",
      },
    },
  },

  // 갤러리
  gallery: {
    layout: "grid" as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: "middle" as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
    images: [
      "/images/gallery/g21535.webp",
      "/images/gallery/g21544.webp",
      "/images/gallery/t352002.webp",
      "/images/gallery/t352044.webp",
      "/images/gallery/t352120.webp",
      "/images/gallery/w09807.webp",
      "/images/gallery/w09915.webp",
      "/images/gallery/w09936.webp",
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message:
      "한 줄기 별빛이 되어 만난 인연\n평생을 함께 걸어가려 합니다.\n\n소중한 분들의 축복 속에\n저희 두 사람이 첫 걸음을 내딛습니다.\n\n귀한 시간 내어 함께해 주신다면\n그 어떤 축복보다 값진 선물이 될 것입니다.",
    groom: {
      name: "성기호",
      label: "아들",
      father: "성도경",
      mother: "김미경",
    },
    bride: {
      name: "조민지",
      label: "딸",
      father: "조희수",
      mother: "권춘자",
    },
  },

  // 계좌번호
  account: {
    groom: {
      bank: "우리",
      number: "1002-349-339243",
      holder: "성기호",
    },
    bride: {
      bank: "카카오뱅크",
      number: "3333-04-2488005",
      holder: "조민지",
    },
    groomFather: {
      bank: "은행명",
      number: "111-222-333444",
      holder: "신랑아버지",
    },
    groomMother: {
      bank: "은행명",
      number: "555-666-777888",
      holder: "신랑어머니",
    },
    brideFather: {
      bank: "은행명",
      number: "999-000-111222",
      holder: "신부아버지",
    },
    brideMother: {
      bank: "은행명",
      number: "333-444-555666",
      holder: "신부어머니",
    },
  },

  // RSVP 설정
  rsvp: {
    enabled: true, // RSVP 섹션 표시 여부
    showMealOption: true, // 식사 여부 입력 옵션 표시 여부
  },

  // 슬랙 알림 설정
  slack: {
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    channel: "#wedding-rsvp",
    compactMessage: true, // 슬랙 메시지를 간결하게 표시
  },
};
