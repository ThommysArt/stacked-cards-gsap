export interface Project {
    title: string;
    description: string;
    url: string;
    images: string[];
    categories: string[];
    video?: string;
    year: number;
}

export const PROJECTS: Project[] = [
    {
        title: "reframe/ui",
        description: "UI kit for building awwwards winning websites with ease. Inspired and replicated from top tier websites in the wild. Easy to use, customizable, and reusable. Just built for engineers and designers.",
        url: "https://reframe-ui.vercel.app/",
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZm9seaYAwbVsar4Dx57yY0ItnduR1MewmFgvHB"],
        categories: ["Personal", "UI/UX"],
        video: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMlfSwtMafrZT1nWIQ8CGBvy2z3RXAw9D5PdOM",
        year: 2025
    },
    {
        title: "Crew SaaS Template",
        description: "A 3D design software made for designers and artists. Design and craft products that are unique, beautiful, and inspiring.",
        categories: ["SaaS", "Landing page"],
        video: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqM7k6BiaocHqk6MWVbOornYEQT0agyRlAD4scp",
        images: ["https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqM1pHz1RUYxpGFhMqDvCTZQw0u12URzX8bsmBr"],
        url: "https://crew-saas-template.vercel.app",
        year: 2025,
    },
    {
        title: "reframe/ui exp 101",
        description: "A template for a portfolio website. It's a great way to showcase your work and attract clients.",
        categories: ["Portfolio", "Template"],
        images: ["https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMtpStXENvXtOPnKkCIms2hrw5BVNJdUFfM7GL"],
        video: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMLRP7gUBD4uXq8V2wM5j3TetLY6cmixazdCKp",
        url: "https://reframeui-exp-101.vercel.app/",
        year: 2025,
    },
    {
        title: "Reverse Studio (Template)",
        description: "An agency portfolio template built with Next.js, GSAP and Framer Motion. It's a great way to showcase your work and attract clients.",
        url: "https://reverse-studio-template.vercel.app/",
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmBi2Lx8J0UuGnArjeD8TVWYhqElQ9IitKf7Xm"],
        categories: ["Template", "Agency"],
        video: "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmVNjzUplQHKkwi3m8y0MsBDlW4g9eACETIhba",
        year: 2025
    },
    {
        title: "Rhyme Studio",
        description: "A digital art studio template built with Next.js, GSAP. Featuring A mersmerizing water ripple effect using three.js and react-three-fiber, as well as a tasteful project slider.",
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFhBd1cVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dge"],
        video: "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFDsvIrVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dge",
        categories: ["Digital Art Studio", "Agency"],
        url: "https://rhyme-studio-template.vercel.app/",
        year: 2025,
    },
    {
        title: "MA Architects",
        description: "A modern architectural design studio template featuring elegant layouts, immersive visuals, and smooth animations. Perfect for showcasing architectural projects, team members, and studio philosophy with a refined, professional web presence.",
        categories: ["Landing Page", "Architectural Design"],
        images: ["https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMd9a0D2F2zB5yogLIXD8jUt0xPp3aZd96eWQb"],
        video: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMH1rZVu3HG0ZpYbguqe9RlOh5ixtkvXAfdWUr",
        url: "https://ma-architects-template.vercel.app/",
        year: 2025,
    },
    {
        title: "Design Gallery Experiment",
        description: "An Image Gallery with pan that has a lens istoration with chromatic shift. This was an expiment to explore the depths of WebGL. Unfortunately not made in Three.js or R3F. May be next time.",
        url: "https://image-gallery-template-seven.vercel.app/",
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFS8ZSLVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dge", "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmO4HqECQvwJoGfAsp4ah1vULW78mFtQnPKSDq"],
        categories: ["Experiment", "Image Gallery"],
        year: 2025
    },
    {
        title: "Fiena Robotics (Template)",
        description: "A template for a robotics company. It's a great way to showcase your work and attract clients.",
        url: "https://fiena-robotics-template.vercel.app/",
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmNgTl2BUd58qmjpUcCawflPzT314dbg7JGIyZ"],
        categories: ["Template", "Robotics"],
        video: "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZm5pthR0IKILwBPEZAso2Qx3bUVrpnF61j78kt",
        year: 2025
    },
    {
        title: 'Reframe Designs',
        description: "A concept for a new interior design studio with amazing animations using GSAP and Nextjs.",
        url: 'https://reframe-designs.vercel.app/',
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmvhZVYTc4ALxuQgt9YGcPUX0jFeE1nZRWNhfC"],
        categories: ["Web Development", "Interior Design"],
        video: "https://hbtxglqkji.ufs.sh/f/rMIXEfoeKMz0ovTHC5IEyPQTucrCqVbL37EZDfh9lz1dX4Mk",
        year: 2025
    },
    {
        title: 'No Jordans',
        description: "Exclusive sneaker designs that break the mold and set new standards in footwear fashion.",
        url: 'https://no-jordans.vercel.app/',
        images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmV8kPCUqlQHKkwi3m8y0MsBDlW4g9eACETIhb"],
        categories: ["E-commerce", "Landing Page"],
        video: "https://e8efl0wgax1cdgj1.public.blob.vercel-storage.com/no-jordans/no%20jordans%201080p-pGe9RIzBwuyEcYAVKFd6LXwh7Ts4Vu.mp4",
        year: 2024
    },
    // {
    //     title: "Thommy Foods",
    //     description: "A fast-food restaurant concept focused on delivering delicious and convenient meals.",
    //     url: "https://thommy-foods.vercel.app/",
    //     images: ["https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqM96CCF04EbKct0nagkm8zW62jFTl4qBOPuVSs", "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMsDZid5J6M2NBQYPyeKacrmVHISw79nJDzd03"],
    //     categories: ["Web Design", "Restaurant", "E-commerce"],
    //     year: 2024
    // },
    // {
    //     title: "Sneaker Deals",
    //     description: "A platform for selling and buying sneakers. We have a catalogue of all the sneakers we sell and a dashboard for our sellers to manage their inventory. We also have a dashboard for our buyers to manage their orders and payments.",
    //     url: "https://sneaker-deals.onrender.com/",
    //     images: ["https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmvFPg4kc4ALxuQgt9YGcPUX0jFeE1nZRWNhfC"],
    //     categories: ["Personal", "E-commerce"],
    //     video: "https://woefz3en0n.ufs.sh/f/l5G0dZjh6GZmFjjn25JVOWKZL2Jd6RXfC9jkl0pYVPxyF4Dg",
    //     year: 2023

    // }
]