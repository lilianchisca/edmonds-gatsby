const sections = {
  HeroSection: {
    sectionPath: `HeroSection`,
    shouldLoadJavascript: true,
  },
  PageIntro: {
    sectionPath: `PageIntro`,
    shouldLoadJavascript: true,
  },
  FeaturedVideo: {
    sectionPath: `FeaturedVideo`,
    shouldLoadJavascript: true,
  },
  TeamMembers: {
    sectionPath: `TeamMembers`,
    shouldLoadJavascript: true,
  },
  FeaturedServices: {
    sectionPath: `FeaturedServices`,
    shouldLoadJavascript: true,
  },
  FeaturedBlocks: {
    sectionPath: `FeaturedBlocks`,
    shouldLoadJavascript: true,
  },
  TestimonialsSlider: {
    sectionPath: `TestimonialsSlider`,
    shouldLoadJavascript: true,
  },
  LatestPosts: {
    sectionPath: `LatestPosts`,
    shouldLoadJavascript: true,
  },
  FeaturedClients: {
    sectionPath: `FeaturedClients`,
    shouldLoadJavascript: true,
  },
  FeaturedContent: {
    sectionPath: `FeaturedContent`,
    shouldLoadJavascript: true,
  },
  CalloutSection: {
    sectionPath: `CalloutSection`,
    shouldLoadJavascript: true,
  },
  ContactSection: {
    sectionPath: `ContactSection`,
    shouldLoadJavascript: true,
  },
  ContentArea: {
    sectionPath: `ContentArea`,
    shouldLoadJavascript: true,
  },
  RelatedPosts: {
    sectionPath: `RelatedPosts`,
    shouldLoadJavascript: true,
  },
  OurServices: {
    sectionPath: `OurServices`,
    shouldLoadJavascript: true,
  },
  ServiceShowcase: {
    sectionPath: `ServiceShowcase`,
    shouldLoadJavascript: true,
  },
  Testimonials: {
    sectionPath: `Testimonials`,
    shouldLoadJavascript: true,
  },
}

export default function getSection(sectionType) {
  const { sectionPath, shouldLoadJavascript } = sections[sectionType]

  return { sectionPath, shouldLoadJavascript }
}
