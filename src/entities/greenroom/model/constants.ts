import { PodcastChoiceDetail } from "./types";

export const PODCAST_CHOICES: PodcastChoiceDetail[] = [
  {
    imageUrl: "/assets/images/podcast-image1.png",
    type: ["위로", "따뜻함", "공감"],
    title: "따뜻한 공감자",
    description: "부드러운 목소리로 마음을 안아주며 위로를 전하는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-image2.png",
    type: ["논리", "해결책", "정리"],
    title: "이성적인 분석가",
    description:
      "복잡한 상황을 논리적으로 분석해 명확한 해법을 제시하는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-my-image.png",
    type: ["응원", "변화", "열정"],
    title: "열정적인 코치",
    description: "에너지가 넘치고 동기부여를 주며 강력하게 응원하는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-image1.png",
    type: ["통찰", "차분함", "깊이"],
    title: "고요한 새벽지기",
    description: "명상하듯 차분하고 깊이 있는 통찰을 나누는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-image2.png",
    type: ["재치", "솔직함", "유머"],
    title: "유쾌한 팩트폭격기",
    description: "재치 있는 농담과 함께 현실적인 조언을 건네는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-my-image.png",
    type: ["기승전결", "몰입", "비유"],
    title: "몰입형 이야기꾼",
    description: "은유와 비유를 활용해 영화 같은 서사를 들려주는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-image1.png",
    type: ["전문성", "신뢰", "가이드"],
    title: "신뢰의 전문가",
    description: "격식과 권위 있는 말투로 신뢰감 있는 조언을 하는 스타일",
  },
  {
    imageUrl: "/assets/images/podcast-image2.png",
    type: ["친근함", "소탈함", "편안함"],
    title: "편안한 동네 친구",
    description: "친한 선후배나 친구처럼 다정하고 소탈하게 이야기하는 스타일",
  },
];

const PODCAST_CHOICE_COUNT = 2;

function getAsciiCodeFromSessionId(sessionId: string) {
  return sessionId.charCodeAt(0);
}

function getDistinctChoiceIndexes(asciiCode: number, totalCount: number) {
  const firstIndex = asciiCode % totalCount;
  const secondSeed = Math.floor(asciiCode / totalCount) % (totalCount - 1);
  const secondIndex =
    secondSeed >= firstIndex ? secondSeed + 1 : secondSeed;

  return [firstIndex, secondIndex];
}

export function getPodcastChoicesBySessionId(sessionId: string | null) {
  if (!sessionId) {
    return PODCAST_CHOICES.slice(0, PODCAST_CHOICE_COUNT);
  }

  const asciiCode = getAsciiCodeFromSessionId(sessionId);
  const indexes = getDistinctChoiceIndexes(asciiCode, PODCAST_CHOICES.length);

  return indexes.map((index) => PODCAST_CHOICES[index]);
}
