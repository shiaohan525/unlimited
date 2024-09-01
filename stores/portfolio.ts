import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    portfolioItems: [
      {
        link: "https://hsiaohan.myportfolio.com/web-designevent-image-site-of-1111-job-bank",
        alt: 'Event image site of 1111 Job Bank',
        src: '/images/index/worksImg01.png',
        tag: 'Web Design',
        title: 'Event image site of 1111 Job Bank'
      },
      {
        link: "https://hsiaohan.myportfolio.com/web-designmcu-of-communication",
        alt: 'MCU of Communication',
        src: '/images/index/worksImg02.png',
        tag: 'Web Design',
        title: 'MCU of Communication'
      },
      {
        link: "https://hsiaohan.myportfolio.com/teachify-oneside-project-of-ui-competition",
        alt: 'Teachify One',
        src: '/images/index/worksImg03.png',
        tag: 'UI Design',
        title: 'Teachify One'
      },
      {
        link: "https://hsiaohan.myportfolio.com/web-ui-design-proposalnthu-center-for-arts-and-culture",
        alt: 'NTHU Center for Arts and Culture',
        src: '/images/index/worksImg04.png',
        tag: 'UI Design',
        title: 'NTHU Center for Arts and Culture'
      },
      {
        link: "https://hsiaohan.myportfolio.com/brandingrigorous",
        alt: 'RIGOROUS',
        src: '/images/index/worksImg05.png',
        tag: 'Branding',
        title: 'RIGOROUS'
      },
      {
        link: "https://hsiaohan.myportfolio.com/publishingintertidal-zone-exploration",
        alt: 'Intertidal zone exploration',
        src: '/images/index/worksImg06.png',
        tag: 'Publishing',
        title: 'Intertidal zone exploration'
      },
      {
        link: "https://hsiaohan.myportfolio.com/social-media-marketing-notice-of-printing",
        alt: 'Notice of Printing',
        src: '/images/index/worksImg07.png',
        tag: 'Illustration',
        title: 'Notice of Printing'
      },
      // 添加更多項目
    ]
  })
})
