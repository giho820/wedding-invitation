import { ShuttleInfo } from '../types/wedding';

const uniqueIdentifier = 'SKH-WEDDING-TEMPLATE-V2';

// 갤러리 레이아웃 타입 정의
type GalleryLayout = 'scroll' | 'grid';
type GalleryPosition = 'middle' | 'bottom';

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  // 메타 정보
  meta: {
    title: '성기호 💚 조민지의 결혼식에 초대합니다',
    description: '26년 4월 25일 오후 1시, 성북구 덕수교회',
    ogImage: '/images/gallery/t352120.webp',
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  // 메인 화면
  main: {
    title: 'Wedding Invitation',
    image: '/images/gallery/w09807.webp',
    date: '2026년 4월 25일 토요일 13시',
    venue: '성북구 덕수교회',
  },

  // 결혼식 일정
  date: {
    year: 2026,
    month: 4,
    day: 25,
    hour: 13,
    minute: 0,
    displayDate: '2026.04.25 토요일 PM 13:00',
  },

  // 장소 정보
  venue: {
    name: '덕수교회',
    address: '서울 성북구 성북로 127\n덕수교회',
    tel: '02-741-5161',
    naverMapId: '덕수교회', // 네이버 지도 검색용 장소명
    coordinates: {
      latitude: 37.59439,
      longitude: 126.9925934,
    },
    placeId: '12085300', // 네이버 지도 장소 ID
    mapZoom: '17', // 지도 줌 레벨
    mapNaverCoordinates: '14137011,4522240,15,0,0,0,dh', // 네이버 지도 길찾기 URL용 좌표 파라미터 (구 형식)
    transportation: {
      subway: '4호선 한성대입구역 6번 출구 하차',
      bus: '한성대입구역 6번출구. 삼선교 정류소 승차\n지선\n1111, 2112(서울구립미술관·쌍다리앞 하차)\n마을\n성북03(쌍다리 하차)',
    },
    parking: `교회 접근하셔서 주차 안내에 따라주세요
      (주차가 협소하니 가급적 대중교통을 이용해주시면 감사하겠습니다.)`,
    iotInfoUrl: 'https://blog.naver.com/storysb/222376981851',
    // 신랑측 배차 안내
    groomShuttle: {
      location: `이리신광교회 맞은편 주차장 ('익산교육문화회관 전기차충전소' 검색)`,
      departureTime: '예식 당일 오전 9시',
      contact: {
        name: '성기호',
        tel: '010-9195-6800',
      },
    },
    brideShuttle: null as ShuttleInfo | null,
  },

  // 갤러리
  gallery: {
    layout: 'grid' as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: 'middle' as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
    images: [
      '/images/gallery/g21535.webp',
      '/images/gallery/g21544.webp',
      '/images/gallery/t352002.webp',
      '/images/gallery/t352044.webp',
      '/images/gallery/t352120.webp',
      '/images/gallery/w09807.webp',
      '/images/gallery/w09915.webp',
      '/images/gallery/w09936.webp',
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message:
      '오랜 기도와 기다림 끝에\n서로를 찾은 두 사람이\n이제 하나가 되려합니다.\n\n저희의 결혼식에 오셔서\n사랑과 축복을 나눠주시면 감사하겠습니다.',
    groom: {
      name: '기호',
      label: '아들',
      father: '성도경',
      mother: '김미경',
    },
    bride: {
      name: '민지',
      label: '딸',
      father: '조희수',
      mother: '권춘자',
    },
  },

  // 계좌번호
  account: {
    groom: {
      bank: '우리',
      number: '1002-349-339243',
      holder: '성기호',
    },
    bride: {
      bank: '우리',
      number: '1002-434-686416',
      holder: '조민지',
    },
    groomFather: {
      bank: '농협',
      number: '344-02-001927',
      holder: '성도경',
    },
    groomMother: {
      bank: '농협',
      number: '531017-52-111616',
      holder: '김미경',
    },
    brideFather: {
      bank: '우리',
      number: '1005-602-388936',
      holder: '조희수',
    },
    brideMother: {
      bank: '우리',
      number: '1002-051-783035',
      holder: '권춘자',
    },
  },

  // RSVP 설정
  rsvp: {
    enabled: true, // RSVP 섹션 표시 여부
    showMealOption: true, // 식사 여부 입력 옵션 표시 여부
  },

  // 슬랙 알림 설정
  slack: {
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || '',
    channel: '#wedding-rsvp',
    compactMessage: true, // 슬랙 메시지를 간결하게 표시
  },
};
