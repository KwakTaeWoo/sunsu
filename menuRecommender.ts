import type {
  MenuRecommendation,
  RecommendationResponse,
  WeatherCondition,
} from './types.ts';

interface GeoCandidate {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  population?: number;
}

interface OpenMeteoWeatherData {
  currentTemp: number;
  apparentTemp: number;
  minTemp: number;
  maxTemp: number;
  rainAmount: number;
  snowAmount: number;
  precipitationAmount: number;
  precipProbability: number;
  windSpeedKmh: number;
  weatherCode: number;
}

type SeasonGroup = '봄' | '여름' | '가을' | '겨울';
type DishCategory = 'soup' | 'hotpot' | 'grill' | 'noodle' | 'rice' | 'savory';

interface DishCandidate {
  name: string;
  emoji: string;
  category: DishCategory;
  minIdealTemp: number;
  maxIdealTemp: number;
  weathers: WeatherCondition[];
  seasons: SeasonGroup[];
  highlight: string;
}

const DISH_CATALOG: DishCandidate[] = [
  // 추운 날 · 겨울 · 영하~영상 초반
  {
    name: '김치찌개',
    emoji: '🥘',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 13,
    weathers: ['clear', 'cloudy', 'rain', 'snow', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '칼칼하고 뜨끈한 돼지고기 김치찌개로 저녁 추위를 녹여줍니다',
  },
  {
    name: '순두부찌개',
    emoji: '🍲',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 15,
    weathers: ['clear', 'cloudy', 'rain', 'snow', 'windy'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '부드러운 순두부와 얼큰한 국물이 차가운 공기에 몸을 덥혀줍니다',
  },
  {
    name: '어묵탕',
    emoji: '🍢',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 11,
    weathers: ['snow', 'rain', 'windy', 'cloudy'],
    seasons: ['가을', '겨울'],
    highlight: '시원하고 구수한 무 국물에 쫄깃한 어묵이 찬 바람 부는 저녁에 제격입니다',
  },
  {
    name: '만두전골',
    emoji: '🥟',
    category: 'hotpot',
    minIdealTemp: -20,
    maxIdealTemp: 10,
    weathers: ['snow', 'rain', 'cloudy', 'windy', 'clear'],
    seasons: ['가을', '겨울'],
    highlight: '김이 모락모락 나는 육수와 속 꽉 찬 만두가 뚝 떨어진 기온에 잘 어울립니다',
  },
  {
    name: '부대찌개',
    emoji: '🫕',
    category: 'hotpot',
    minIdealTemp: -20,
    maxIdealTemp: 12,
    weathers: ['rain', 'snow', 'cloudy', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '진한 육수와 사리의 푸짐함이 쌀쌀한 저녁 식탁을 든든하게 채워줍니다',
  },
  {
    name: '동태찌개',
    emoji: '🐟',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 9,
    weathers: ['snow', 'windy', 'cloudy', 'clear'],
    seasons: ['겨울', '가을'],
    highlight: '시원칼칼한 무와 미나리가 어우러져 겨울철 기온이 내려간 날 속을 풀어줍니다',
  },
  {
    name: '굴국밥',
    emoji: '🦪',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 11,
    weathers: ['clear', 'cloudy', 'windy', 'snow'],
    seasons: ['가을', '겨울'],
    highlight: '제철 굴의 깊은 감칠맛과 맑고 따뜻한 국물이 추운 저녁 보양식으로 알맞습니다',
  },
  {
    name: '소고기 버섯전골',
    emoji: '🍄',
    category: 'hotpot',
    minIdealTemp: -15,
    maxIdealTemp: 15,
    weathers: ['clear', 'cloudy', 'rain', 'snow', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '향긋한 버섯과 부드러운 소고기를 따뜻하게 끓여 먹기 좋은 저녁 메뉴입니다',
  },
  {
    name: '감자탕',
    emoji: '🍖',
    category: 'hotpot',
    minIdealTemp: -20,
    maxIdealTemp: 14,
    weathers: ['rain', 'snow', 'cloudy', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '우거지와 들깨가 들어간 구수하고 진한 국물이 쌀쌀한 밤 기운을 이겨냅니다',
  },
  {
    name: '떡만둣국',
    emoji: '🥣',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 10,
    weathers: ['snow', 'clear', 'cloudy', 'windy'],
    seasons: ['겨울', '봄'],
    highlight: '담백한 사골 육수에 떡과 만두를 듬뿍 넣어 차가운 날 부담 없이 따뜻합니다',
  },
  {
    name: '소고기 무국',
    emoji: '🍲',
    category: 'soup',
    minIdealTemp: -15,
    maxIdealTemp: 14,
    weathers: ['clear', 'cloudy', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '달큰한 무와 소고기를 오래 끓여낸 맑은 국물이 속을 편안하게 데워줍니다',
  },
  {
    name: '육개장',
    emoji: '🌶️',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 14,
    weathers: ['windy', 'snow', 'rain', 'cloudy'],
    seasons: ['가을', '겨울', '여름'],
    highlight: '얼큰한 대파와 고사리가 듬뿍 들어가 떨어지는 기온에 활력을 더해줍니다',
  },
  {
    name: '설렁탕',
    emoji: '🥛',
    category: 'soup',
    minIdealTemp: -20,
    maxIdealTemp: 12,
    weathers: ['snow', 'clear', 'windy', 'cloudy'],
    seasons: ['겨울', '가을', '봄'],
    highlight: '진하게 고아낸 뽀얀 국물과 소면이 서늘한 저녁 공기에 든든함을 줍니다',
  },
  {
    name: '샤브샤브',
    emoji: '🥬',
    category: 'hotpot',
    minIdealTemp: -15,
    maxIdealTemp: 17,
    weathers: ['rain', 'snow', 'cloudy', 'clear', 'windy'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '신선한 채소와 얇은 고기를 따뜻한 육수에 데쳐 가볍지만 포근하게 즐깁니다',
  },

  // 비·눈·흐림 특화 면류 & 전류
  {
    name: '해물 파전',
    emoji: '🥞',
    category: 'savory',
    minIdealTemp: -5,
    maxIdealTemp: 24,
    weathers: ['rain', 'cloudy'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '빗소리와 어울리는 바삭한 식감과 고소한 쪽파·해물 향이 입맛을 돋웁니다',
  },
  {
    name: '김치전',
    emoji: '🫓',
    category: 'savory',
    minIdealTemp: -5,
    maxIdealTemp: 23,
    weathers: ['rain', 'cloudy'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '매콤하고 바삭하게 부쳐낸 김치전이 습하고 흐린 날씨에 기분 전환이 됩니다',
  },
  {
    name: '바지락 칼국수',
    emoji: '🍜',
    category: 'noodle',
    minIdealTemp: -10,
    maxIdealTemp: 18,
    weathers: ['rain', 'cloudy', 'windy', 'snow'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '시원한 바지락 육수와 쫄깃한 면발이 비 오거나 쌀쌀한 저녁에 딱 맞습니다',
  },
  {
    name: '들깨 수제비',
    emoji: '🥣',
    category: 'noodle',
    minIdealTemp: -12,
    maxIdealTemp: 16,
    weathers: ['rain', 'snow', 'cloudy', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '고소한 들깨 국물과 쫀득한 반죽이 흐리고 서늘한 날 마음을 포근하게 합니다',
  },
  {
    name: '얼큰 짬뽕',
    emoji: '🦐',
    category: 'noodle',
    minIdealTemp: -12,
    maxIdealTemp: 18,
    weathers: ['rain', 'cloudy', 'windy', 'snow'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '불향 가득한 해물 육수가 눅눅하거나 차가운 날의 피로를 개운하게 날려줍니다',
  },
  {
    name: '잔치국수',
    emoji: '🍝',
    category: 'noodle',
    minIdealTemp: -5,
    maxIdealTemp: 19,
    weathers: ['rain', 'cloudy', 'clear'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '구수한 멸치 육수를 부어 가볍고 따뜻하게 한 그릇 비우기 좋은 저녁 메뉴입니다',
  },
  {
    name: '김치우동',
    emoji: '🍲',
    category: 'noodle',
    minIdealTemp: -15,
    maxIdealTemp: 14,
    weathers: ['rain', 'snow', 'windy', 'cloudy'],
    seasons: ['가을', '겨울'],
    highlight: '오동통한 우동 면발과 칼칼한 국물이 쌀쌀한 밤 기운에 잘 어울립니다',
  },

  // 구이 · 볶음 · 찜 (선선~맑음~추운 날 두루 어울리는 메인)
  {
    name: '제육볶음',
    emoji: '🥩',
    category: 'grill',
    minIdealTemp: -10,
    maxIdealTemp: 25,
    weathers: ['clear', 'cloudy', 'rain', 'windy', 'snow'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '매콤달콤한 양념과 쌈 채소가 계절을 가리지 않고 밥 한 공기를 부릅니다',
  },
  {
    name: '돼지고기 김치찜',
    emoji: '🍖',
    category: 'hotpot',
    minIdealTemp: -15,
    maxIdealTemp: 16,
    weathers: ['rain', 'snow', 'cloudy', 'clear', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '푹 익힌 묵은지와 부드러운 돼지고기가 서늘한 기온에 깊은 만족감을 줍니다',
  },
  {
    name: '고등어구이',
    emoji: '🐟',
    category: 'grill',
    minIdealTemp: -5,
    maxIdealTemp: 22,
    weathers: ['clear', 'cloudy', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '노릇하게 구워 기름진 고등어와 따뜻한 쌀밥이 담백한 집밥 저녁을 만듭니다',
  },
  {
    name: '갈치조림',
    emoji: '🐠',
    category: 'hotpot',
    minIdealTemp: -5,
    maxIdealTemp: 19,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['가을', '겨울'],
    highlight: '달큰한 무와 칼칼한 양념이 배어든 제철 갈치가 선선한 저녁에 일품입니다',
  },
  {
    name: '소불고기',
    emoji: '🥩',
    category: 'grill',
    minIdealTemp: -10,
    maxIdealTemp: 24,
    weathers: ['clear', 'cloudy', 'snow'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '달짝지근한 간장 양념에 버섯과 당면을 더해 남녀노소 편안한 저녁 한 상입니다',
  },
  {
    name: '낙지볶음',
    emoji: '🐙',
    category: 'grill',
    minIdealTemp: -5,
    maxIdealTemp: 24,
    weathers: ['cloudy', 'rain', 'clear'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '쫄깃한 낙지와 매콤한 양념이 나른한 저녁 입맛을 단번에 살려줍니다',
  },
  {
    name: '오징어볶음',
    emoji: '🦑',
    category: 'grill',
    minIdealTemp: 0,
    maxIdealTemp: 25,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['봄', '여름', '가을'],
    highlight: '아삭한 채소와 탱글한 오징어를 센 불에 볶아 밥과 비벼 먹기 좋습니다',
  },
  {
    name: '닭볶음탕',
    emoji: '🍗',
    category: 'hotpot',
    minIdealTemp: -15,
    maxIdealTemp: 17,
    weathers: ['rain', 'snow', 'cloudy', 'windy'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '포슬포슬한 감자와 칼칼한 국물이 서늘한 날씨에 푸짐한 한 끼가 됩니다',
  },
  {
    name: '찜닭',
    emoji: '🍗',
    category: 'grill',
    minIdealTemp: -5,
    maxIdealTemp: 21,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['봄', '가을', '겨울'],
    highlight: '짭조름한 간장 양념이 밴 당면과 닭고기가 맑거나 흐린 날 모두 잘 어울립니다',
  },
  {
    name: '삼겹살 구이와 쌈',
    emoji: '🥓',
    category: 'grill',
    minIdealTemp: -5,
    maxIdealTemp: 24,
    weathers: ['clear', 'windy', 'cloudy'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '노릇하게 구운 삼겹살에 신선한 쌈 채소를 곁들여 기분 좋게 즐기는 저녁입니다',
  },
  {
    name: '쭈꾸미 볶음',
    emoji: '🐙',
    category: 'grill',
    minIdealTemp: 4,
    maxIdealTemp: 22,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['봄', '가을'],
    highlight: '봄·가을철 쫄깃하게 오른 주꾸미를 매콤하게 볶아 쌈과 함께 즐기기 좋습니다',
  },
  {
    name: '보쌈과 겉절이',
    emoji: '🥬',
    category: 'grill',
    minIdealTemp: -10,
    maxIdealTemp: 18,
    weathers: ['clear', 'cloudy', 'snow'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '야들야들하게 삶은 수육과 아삭한 배추 겉절이가 선선한 저녁에 근사합니다',
  },

  // 덮밥 · 비빔 · 가벼운 한 그릇
  {
    name: '꼬막 비빔밥',
    emoji: '🐚',
    category: 'rice',
    minIdealTemp: -5,
    maxIdealTemp: 18,
    weathers: ['clear', 'cloudy', 'windy'],
    seasons: ['가을', '겨울'],
    highlight: '찬 바람 불기 시작할 때 살이 차오르는 꼬막을 양념장에 쓱쓱 비벼 먹기 좋습니다',
  },
  {
    name: '산채 비빔밥',
    emoji: '🥗',
    category: 'rice',
    minIdealTemp: 8,
    maxIdealTemp: 26,
    weathers: ['clear', 'cloudy'],
    seasons: ['봄', '여름', '가을'],
    highlight: '향긋한 제철 나물과 고소한 참기름을 더해 산뜻하고 균형 잡힌 저녁을 차립니다',
  },
  {
    name: '연어 덮밥 (사케동)',
    emoji: '🍣',
    category: 'rice',
    minIdealTemp: 10,
    maxIdealTemp: 28,
    weathers: ['clear', 'cloudy'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '부드러운 생연어와 담백한 밥이 깔끔하고 산뜻한 저녁 식사로 어울립니다',
  },
  {
    name: '장어 덮밥',
    emoji: '🍱',
    category: 'rice',
    minIdealTemp: 12,
    maxIdealTemp: 32,
    weathers: ['clear', 'cloudy'],
    seasons: ['여름', '가을', '봄'],
    highlight: '달콤짭짤한 소스로 구워낸 장어가 기온이 오르는 계절의 원기를 채워줍니다',
  },
  {
    name: '카레라이스',
    emoji: '🍛',
    category: 'rice',
    minIdealTemp: -10,
    maxIdealTemp: 25,
    weathers: ['clear', 'cloudy', 'rain', 'snow'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '향신료의 은은한 온기가 날씨와 상관없이 속을 편안하게 채워줍니다',
  },
  {
    name: '강된장 쌈밥',
    emoji: '🥬',
    category: 'rice',
    minIdealTemp: 8,
    maxIdealTemp: 27,
    weathers: ['clear', 'cloudy'],
    seasons: ['봄', '여름', '가을'],
    highlight: '구수한 강된장에 제철 쌈 채소를 곁들여 가볍고 건강하게 즐기는 저녁입니다',
  },
  {
    name: '돌솥 비빔밥',
    emoji: '🍚',
    category: 'rice',
    minIdealTemp: -10,
    maxIdealTemp: 18,
    weathers: ['clear', 'cloudy', 'windy', 'snow'],
    seasons: ['가을', '겨울', '봄'],
    highlight: '지글지글 눌어붙는 누룽지의 고소함이 서늘한 저녁 식탁에 온기를 더합니다',
  },

  // 봄 · 여름 · 따뜻한 날 특화
  {
    name: '도다리 쑥국',
    emoji: '🌿',
    category: 'soup',
    minIdealTemp: 5,
    maxIdealTemp: 19,
    weathers: ['clear', 'cloudy', 'windy'],
    seasons: ['봄'],
    highlight: '향긋한 봄 쑥과 담백한 도다리가 어우러져 환절기 기운을 북돋워줍니다',
  },
  {
    name: '냉이 된장찌개',
    emoji: '🍲',
    category: 'soup',
    minIdealTemp: 3,
    maxIdealTemp: 19,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['봄'],
    highlight: '봄내음 가득한 냉이와 구수한 된장이 일교차 큰 날 저녁 밥상에 잘 어울립니다',
  },
  {
    name: '물냉면',
    emoji: '🧊',
    category: 'noodle',
    minIdealTemp: 18,
    maxIdealTemp: 40,
    weathers: ['clear', 'cloudy'],
    seasons: ['여름', '봄'],
    highlight: '살얼음 동동 띤 새콤시원한 육수가 더운 날의 열기를 단숨에 식혀줍니다',
  },
  {
    name: '비빔냉면',
    emoji: '🌶️',
    category: 'noodle',
    minIdealTemp: 17,
    maxIdealTemp: 40,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['여름', '봄', '가을'],
    highlight: '매콤달콤한 양념장과 시원한 면발이 입맛 떨어지는 높은 기온에 활기를 줍니다',
  },
  {
    name: '콩국수',
    emoji: '🥛',
    category: 'noodle',
    minIdealTemp: 19,
    maxIdealTemp: 40,
    weathers: ['clear', 'cloudy'],
    seasons: ['여름'],
    highlight: '고소하고 진하게 갈아낸 시원한 콩물이 무더운 여름 저녁을 담백하게 채워줍니다',
  },
  {
    name: '메밀 소바',
    emoji: '🥢',
    category: 'noodle',
    minIdealTemp: 16,
    maxIdealTemp: 38,
    weathers: ['clear', 'cloudy'],
    seasons: ['여름', '봄', '가을'],
    highlight: '차갑게 적셔 먹는 쯔유와 구수한 메밀면이 후덥지근한 저녁에 산뜻합니다',
  },
  {
    name: '초계국수',
    emoji: '🍗',
    category: 'noodle',
    minIdealTemp: 19,
    maxIdealTemp: 40,
    weathers: ['clear', 'cloudy'],
    seasons: ['여름'],
    highlight: '시원한 닭 육수에 겨자와 식초의 상큼함을 더해 더위 보양과 입맛을 함께 잡습니다',
  },
  {
    name: '삼계탕',
    emoji: '🐓',
    category: 'soup',
    minIdealTemp: 16,
    maxIdealTemp: 40,
    weathers: ['clear', 'rain', 'cloudy'],
    seasons: ['여름', '가을'],
    highlight: '이열치열의 대표 보양식으로 땀으로 빠진 기력을 따뜻하게 보충해 줍니다',
  },
  {
    name: '묵사발과 김밥',
    emoji: '🥒',
    category: 'savory',
    minIdealTemp: 18,
    maxIdealTemp: 38,
    weathers: ['clear', 'cloudy'],
    seasons: ['여름', '봄'],
    highlight: '시원한 김치 육수의 도토리묵과 김밥 조합이 가볍고 청량한 저녁이 됩니다',
  },
  {
    name: '열무 비빔국수',
    emoji: '🥬',
    category: 'noodle',
    minIdealTemp: 16,
    maxIdealTemp: 38,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['여름', '봄'],
    highlight: '아삭한 열무김치와 새콤한 양념이 무더위에 지친 저녁 입맛을 살려줍니다',
  },
  {
    name: '월남쌈과 쌀국수',
    emoji: '🌯',
    category: 'savory',
    minIdealTemp: 14,
    maxIdealTemp: 32,
    weathers: ['clear', 'cloudy', 'rain'],
    seasons: ['봄', '여름', '가을'],
    highlight: '다채로운 채소를 얇은 라이스페이퍼에 싸 먹어 부담 없이 산뜻한 저녁입니다',
  },
  {
    name: '대하 소금구이',
    emoji: '🍤',
    category: 'grill',
    minIdealTemp: 5,
    maxIdealTemp: 21,
    weathers: ['clear', 'windy', 'cloudy'],
    seasons: ['가을'],
    highlight: '가을철 탱글하게 살이 오른 새우를 소금 위에 바삭하게 구워 제철 풍미를 즐깁니다',
  },
  {
    name: '청국장 찌개',
    emoji: '🍲',
    category: 'soup',
    minIdealTemp: -15,
    maxIdealTemp: 15,
    weathers: ['clear', 'cloudy', 'windy', 'snow'],
    seasons: ['가을', '겨울'],
    highlight: '구수하고 깊은 발효 풍미가 쌀쌀한 밤 공기에 정겨운 집밥의 온기를 전합니다',
  },
  {
    name: '된장찌개와 계란말이',
    emoji: '🍳',
    category: 'soup',
    minIdealTemp: -10,
    maxIdealTemp: 24,
    weathers: ['clear', 'cloudy', 'rain', 'windy'],
    seasons: ['봄', '여름', '가을', '겨울'],
    highlight: '두부와 애호박을 넣은 구수한 찌개와 부드러운 계란말이가 편안한 저녁을 완성합니다',
  },
];

function getKoreanDateAndSeason(): {
  displayDate: string;
  season: string;
  seasonGroup: SeasonGroup;
} {
  const now = new Date();
  const displayDate = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(now);

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const month = Number(parts.find((p) => p.type === 'month')?.value ?? '1');
  const day = Number(parts.find((p) => p.type === 'day')?.value ?? '1');

  let season = '겨울';
  let seasonGroup: SeasonGroup = '겨울';

  if (month === 3) {
    season = day < 15 ? '초봄' : '봄';
    seasonGroup = '봄';
  } else if (month === 4) {
    season = '봄';
    seasonGroup = '봄';
  } else if (month === 5) {
    season = day > 20 ? '늦봄' : '봄';
    seasonGroup = '봄';
  } else if (month === 6) {
    season = day < 15 ? '초여름' : '여름';
    seasonGroup = '여름';
  } else if (month === 7) {
    season = '한여름';
    seasonGroup = '여름';
  } else if (month === 8) {
    season = day > 20 ? '늦여름' : '여름';
    seasonGroup = '여름';
  } else if (month === 9) {
    season = day < 15 ? '초가을' : '가을';
    seasonGroup = '가을';
  } else if (month === 10) {
    season = '가을';
    seasonGroup = '가을';
  } else if (month === 11) {
    season = day > 18 ? '늦가을' : '가을';
    seasonGroup = '가을';
  } else if (month === 12) {
    season = day < 15 ? '초겨울' : '겨울';
    seasonGroup = '겨울';
  } else if (month === 1) {
    season = '한겨울';
    seasonGroup = '겨울';
  } else if (month === 2) {
    season = day > 20 ? '늦겨울' : '겨울';
    seasonGroup = '겨울';
  }

  return { displayDate, season, seasonGroup };
}

function buildSearchQueries(region: string): string[] {
  const trimmed = region.trim();
  const queries: string[] = [trimmed];

  const strippedSuffix = trimmed
    .replace(/(특별시|광역시|특별자치시|특별자치도|시|군|구|읍|면)$/, '')
    .trim();
  if (strippedSuffix && strippedSuffix !== trimmed) {
    queries.push(strippedSuffix);
  }

  const tokens = trimmed.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const last = tokens[tokens.length - 1];
    const lastStripped = last.replace(/(시|군|구|읍|면|동)$/, '').trim();
    if (lastStripped) queries.push(lastStripped);
    const first = tokens[0].replace(/(특별시|광역시|도)$/, '').trim();
    if (first) queries.push(first);
  }

  return Array.from(new Set(queries));
}

async function geocodeRegion(region: string): Promise<GeoCandidate> {
  const queries = buildSearchQueries(region);

  for (const query of queries) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query,
    )}&count=5&language=ko&format=json`;

    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      throw new Error(`GEOCODING_HTTP_${response.status}`);
    }

    const data = (await response.json()) as { results?: GeoCandidate[] };
    const results = data.results;
    if (Array.isArray(results) && results.length > 0) {
      const sorted = [...results].sort((a, b) => {
        const aKr = a.country_code === 'KR' ? 1 : 0;
        const bKr = b.country_code === 'KR' ? 1 : 0;
        if (aKr !== bKr) return bKr - aKr;
        return (b.population ?? 0) - (a.population ?? 0);
      });
      return sorted[0];
    }
  }

  throw new Error('LOCATION_NOT_FOUND');
}

async function fetchOpenMeteoWeather(lat: number, lon: number): Promise<OpenMeteoWeatherData> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      'temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m',
    daily:
      'temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max,weather_code',
    timezone: 'auto',
    forecast_days: '1',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) {
    throw new Error(`WEATHER_HTTP_${response.status}`);
  }

  const data = (await response.json()) as {
    current?: {
      temperature_2m?: number;
      apparent_temperature?: number;
      precipitation?: number;
      rain?: number;
      showers?: number;
      snowfall?: number;
      weather_code?: number;
      wind_speed_10m?: number;
    };
    daily?: {
      temperature_2m_max?: number[];
      temperature_2m_min?: number[];
      precipitation_sum?: number[];
      rain_sum?: number[];
      snowfall_sum?: number[];
      precipitation_probability_max?: number[];
      weather_code?: number[];
    };
  };

  const c = data.current;
  const currentTemp = c?.temperature_2m;
  if (!c || typeof currentTemp !== 'number') {
    throw new Error('WEATHER_DATA_INVALID');
  }

  const d = data.daily;

  return {
    currentTemp: Math.round(currentTemp * 10) / 10,
    apparentTemp: Math.round((c.apparent_temperature ?? currentTemp) * 10) / 10,
    minTemp: Math.round((d?.temperature_2m_min?.[0] ?? currentTemp) * 10) / 10,
    maxTemp: Math.round((d?.temperature_2m_max?.[0] ?? currentTemp) * 10) / 10,
    rainAmount: Number(((c.rain ?? 0) + (c.showers ?? 0) + (d?.rain_sum?.[0] ?? 0)).toFixed(1)),
    snowAmount: Number(((c.snowfall ?? 0) + (d?.snowfall_sum?.[0] ?? 0)).toFixed(1)),
    precipitationAmount: Number(
      ((c.precipitation ?? 0) + (d?.precipitation_sum?.[0] ?? 0)).toFixed(1),
    ),
    precipProbability: Math.round(d?.precipitation_probability_max?.[0] ?? 0),
    windSpeedKmh: Math.round(c.wind_speed_10m ?? 0),
    weatherCode: c.weather_code ?? d?.weather_code?.[0] ?? 0,
  };
}

function interpretWeather(weather: OpenMeteoWeatherData): {
  condition: WeatherCondition;
  label: string;
  precipitationText: string;
} {
  const code = weather.weatherCode;
  const hasSnow = weather.snowAmount > 0 || [71, 73, 75, 77, 85, 86].includes(code);
  const hasRain =
    !hasSnow &&
    (weather.rainAmount > 0 ||
      [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code));

  if (hasSnow) {
    return {
      condition: 'snow',
      label: '눈',
      precipitationText:
        weather.snowAmount > 0
          ? `눈 예보 (적설 ${weather.snowAmount}cm · 강수확률 ${weather.precipProbability}%)`
          : `눈 소식 (강수확률 ${weather.precipProbability}%)`,
    };
  }

  if (hasRain) {
    return {
      condition: 'rain',
      label: code >= 51 && code <= 57 ? '이슬비' : '비',
      precipitationText:
        weather.rainAmount > 0
          ? `비 예보 (${weather.rainAmount}mm · 강수확률 ${weather.precipProbability}%)`
          : `비 소식 (강수확률 ${weather.precipProbability}%)`,
    };
  }

  if ([2, 3, 45, 48].includes(code)) {
    const label = code === 45 || code === 48 ? '안개' : code === 2 ? '구름 조금' : '흐림';
    return {
      condition: 'cloudy',
      label,
      precipitationText:
        weather.precipProbability > 0
          ? `강수 없음 (강수확률 ${weather.precipProbability}%)`
          : '비·눈 소식 없음',
    };
  }

  if (weather.windSpeedKmh >= 24) {
    return {
      condition: 'windy',
      label: '바람',
      precipitationText: `강수 없음 · 바람 ${weather.windSpeedKmh}km/h`,
    };
  }

  return {
    condition: 'clear',
    label: '맑음',
    precipitationText:
      weather.precipProbability > 0
        ? `비·눈 없음 (강수확률 ${weather.precipProbability}%)`
        : '비·눈 소식 없음',
  };
}

function buildWeatherSummary(
  minTemp: number,
  condition: WeatherCondition,
  label: string,
  precipitationText: string,
  windSpeedKmh: number,
): string {
  let tempTone = '선선한';
  if (minTemp <= 0) tempTone = '영하권으로 매섭게 추운';
  else if (minTemp <= 6) tempTone = '쌀쌀하고 공기가 차가운';
  else if (minTemp <= 13) tempTone = '서늘하고 선선한';
  else if (minTemp <= 19) tempTone = '쾌적하고 온화한';
  else if (minTemp <= 24) tempTone = '포근하고 따뜻한';
  else tempTone = '밤에도 열기가 남아 무더운';

  if (condition === 'rain') {
    return `오늘 최저 기온 ${minTemp}°C로 ${tempTone} 가운데 ${label} 소식(${precipitationText})이 있어 따뜻하고 습기를 달래주는 식사가 잘 어울립니다.`;
  }
  if (condition === 'snow') {
    return `오늘 최저 기온 ${minTemp}°C로 ${tempTone} 데다 눈이 내려(${precipitationText}) 속까지 든든히 데워주는 저녁이 필요합니다.`;
  }
  if (condition === 'windy') {
    return `오늘 최저 기온 ${minTemp}°C에 바람(${windSpeedKmh}km/h)까지 불어 체감 온도가 낮아, 따뜻하고 기운을 채워주는 저녁이 좋습니다.`;
  }
  if (condition === 'cloudy') {
    return `오늘 최저 기온 ${minTemp}°C의 ${label} 하늘로 ${tempTone} 하루여서, 감칠맛 있고 기분을 살려주는 메뉴가 잘 어울립니다.`;
  }
  return `오늘 최저 기온 ${minTemp}°C의 맑고 ${tempTone} 날씨(${precipitationText})로, 계절감에 맞춰 부담 없이 즐기기 좋은 저녁입니다.`;
}

function scoreDish(
  dish: DishCandidate,
  minTemp: number,
  condition: WeatherCondition,
  seasonGroup: SeasonGroup,
): number {
  let score = 0;

  if (minTemp >= dish.minIdealTemp && minTemp <= dish.maxIdealTemp) {
    score += 45;
  } else {
    const distance =
      minTemp < dish.minIdealTemp ? dish.minIdealTemp - minTemp : minTemp - dish.maxIdealTemp;
    score += Math.max(0, 30 - distance * 3);
  }

  if (dish.weathers.includes(condition)) {
    score += dish.weathers[0] === condition ? 28 : 18;
  }

  if (dish.seasons.includes(seasonGroup)) {
    score += dish.seasons[0] === seasonGroup ? 25 : 14;
  }

  // 약간의 무작위성으로 동일 조건에서도 다채로운 추천 제공
  score += Math.random() * 6;
  return score;
}

function formatBasisType(
  dish: DishCandidate,
  minTemp: number,
  condition: WeatherCondition,
  seasonGroup: SeasonGroup,
): string {
  const tempMatched = minTemp >= dish.minIdealTemp && minTemp <= dish.maxIdealTemp;
  const seasonMatched = dish.seasons[0] === seasonGroup;
  const weatherMatched = dish.weathers[0] === condition;

  if (weatherMatched && tempMatched) return `최저 기온 · ${condition === 'rain' ? '비' : condition === 'snow' ? '눈' : '날씨'}`;
  if (seasonMatched && tempMatched) return `최저 기온 · ${seasonGroup} 계절`;
  if (seasonMatched) return `${seasonGroup} 계절`;
  return '최저 기온 · 날씨';
}

function formatReason(
  dish: DishCandidate,
  minTemp: number,
  label: string,
  season: string,
): string {
  return `오늘 최저 ${minTemp}°C의 ${label} 날씨와 ${season}에 맞춰, ${dish.highlight}.`;
}

function selectFiveMenus(
  minTemp: number,
  condition: WeatherCondition,
  label: string,
  season: string,
  seasonGroup: SeasonGroup,
  excludeMenus: string[],
): MenuRecommendation[] {
  const excludedSet = new Set(excludeMenus.map((m) => m.trim()));
  let pool = DISH_CATALOG.filter((dish) => !excludedSet.has(dish.name));

  // 모든 메뉴가 소진될 정도로 반복 새로고침한 경우 최근 5개만 제외하고 순환
  if (pool.length < 5) {
    const recentFive = new Set(excludeMenus.slice(-5).map((m) => m.trim()));
    pool = DISH_CATALOG.filter((dish) => !recentFive.has(dish.name));
  }

  const scored = pool
    .map((dish) => ({
      dish,
      score: scoreDish(dish, minTemp, condition, seasonGroup),
    }))
    .sort((a, b) => b.score - a.score);

  const chosen: DishCandidate[] = [];
  const usedCategories = new Set<DishCategory>();

  // 1차 패스: 카테고리 다양성을 우선해 상위 후보 선택
  for (const item of scored) {
    if (chosen.length === 5) break;
    if (!usedCategories.has(item.dish.category)) {
      chosen.push(item.dish);
      usedCategories.add(item.dish.category);
    }
  }

  // 2차 패스: 부족한 슬롯을 점수 순으로 채움
  for (const item of scored) {
    if (chosen.length === 5) break;
    if (!chosen.some((c) => c.name === item.dish.name)) {
      chosen.push(item.dish);
    }
  }

  return chosen.map((dish) => ({
    name: dish.name,
    emoji: dish.emoji,
    reason: formatReason(dish, minTemp, label, season),
    basisType: formatBasisType(dish, minTemp, condition, seasonGroup),
  }));
}

export async function recommendDinnerMenus(
  regionInput: string,
  excludeMenus: string[] = [],
): Promise<RecommendationResponse> {
  const region = regionInput.trim().slice(0, 50) || '목포';

  try {
    const geo = await geocodeRegion(region);
    const weather = await fetchOpenMeteoWeather(geo.latitude, geo.longitude);
    const interpreted = interpretWeather(weather);
    const { displayDate, season, seasonGroup } = getKoreanDateAndSeason();

    const resolvedLocation = [geo.name, geo.admin1, geo.country]
      .filter((part, idx, arr) => Boolean(part) && arr.indexOf(part) === idx)
      .join(', ');

    const weatherSummary = buildWeatherSummary(
      weather.minTemp,
      interpreted.condition,
      interpreted.label,
      interpreted.precipitationText,
      weather.windSpeedKmh,
    );

    const menus = selectFiveMenus(
      weather.minTemp,
      interpreted.condition,
      interpreted.label,
      season,
      seasonGroup,
      excludeMenus,
    );

    return {
      region,
      resolvedLocation: resolvedLocation || region,
      dateLabel: displayDate,
      season,
      weatherSummary,
      temperature: `최저 ${weather.minTemp}°C`,
      tempRange: `현재 ${weather.currentTemp}°C · 최고 ${weather.maxTemp}°C`,
      precipitation: interpreted.precipitationText,
      weatherCondition: interpreted.condition,
      weatherConditionLabel: interpreted.label,
      menus,
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'LOCATION_NOT_FOUND') {
      throw new Error(
        '입력하신 지역을 찾지 못했습니다. 지역 이름을 확인한 뒤 잠시 후 다시 시도해 주세요.',
      );
    }
    throw new Error('날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }
}
