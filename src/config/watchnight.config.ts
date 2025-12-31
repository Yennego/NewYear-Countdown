export const WATCHNIGHT_CONFIG = {
  theme: {
    name: "CROSSING OVER",
    year: "2025",
    // Simulation / Target Date (Default is Midnight Jan 1, 2026)
    // For testing, user can change this to a near-future time today
    targetDate: {
      year: 2025,
      month: 11, // 0 = January, 11 = December
      day: 31,
      hour: 23,
      minute: 59,
      second: 0
    },
    colors: {
      primary: "#D4AF37", // Gold
      secondary: "#000000", // Black
      accent: "#1A237E", // Deep Blue
      background: "bg-black",
    },
  },
  phases: {
    waiting: {
      id: "waiting",
      title: "Waiting Room",
      threshold: -1, // Infinite until manual or 11 PM
      scriptures: [
        { text: "Ebenezer — Thus far the Lord has helped us.", reference: "1 Samuel 7:12" },
        { text: "The same God who brought you through this year will carry you into the next.", reference: "" },
        { text: "Behold, I will do a new thing; now it shall spring forth.", reference: "Isaiah 43:19" },
        { text: "We are standing on the threshold of a new season.", reference: "" },
      ],
    },
    awakening: {
      id: "awakening",
      title: "Countdown Awakening",
      label: "Counting Down to a New Beginning",
    },
    sacred: {
      id: "sacred",
      title: "The Sacred Moment",
      propheticWords: {
        10: "FAITH",
        9: "HOPE",
        8: "GRACE",
        7: "MERCY",
        6: "FAVOR",
        5: "POWER",
        4: "JOY",
        3: "PEACE",
        2: "THANKSGIVING",
        1: "PRAISE",
      },
    },
    midnight: {
      id: "midnight",
      title: "Midnight Moment",
      declaration: "WELCOME TO 2026",
      subtext: "Our Year of SUPERNATURAL RECOVERY",
      quote: "What took years will happen in moments.",
    },
    prayer: {
      id: "prayer",
      title: "Declaration & Prayer",
      declarations: [
        "This year, we advance.",
        "We build with wisdom.",
        "We walk in favor.",
        "We will testify — to the glory of God.",
      ],
      footer: "2026 — Our Year of Supernatural Recovery",
    },
  },
};
