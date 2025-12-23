import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import sample_img_3 from "./sample_img_3.webp";
import sample_img_4 from "./sample_img_4.jpeg";
import sample_img_5 from "./sample_img_5.jpg";
import sample_img_6 from "./sample_img_6.jpeg";
import sample_img_7 from "./sample_img_7.jpg";
import sample_img_8 from "./sample_img_8.jpg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.jpeg";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  sample_img_3,
  sample_img_4,
  sample_img_5,
  sample_img_6,
  sample_img_7,
  sample_img_8,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
};

export const stepsData = [
  {
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: step_icon_1,
  },
  {
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: step_icon_2,
  },
  {
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Donald Jackman",
    role: "Graphic Designer",
    stars: 5,
    text: "Imaginex has completely changed the way I create visuals. I can turn rough ideas into polished images within seconds, saving hours of design time.",
  },
  {
    image: profile_img_2,
    name: "Richard Nelson",
    role: "Content Creator",
    stars: 4,
    text: "As a content creator, Imaginex helps me generate unique visuals effortlessly. The results are consistent, high-quality, and perfect for social media.",
  },
  {
    image: profile_img_3,
    name: "Sophia Martinez",
    role: "Marketing Specialist",
    stars: 5,
    text: "Imaginex makes visual content creation incredibly simple. From campaign concepts to final creatives, it delivers stunning results every time.",
  },
];

export const plans = [
  {
    id: "Basic",
    price: 10,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 50,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];
