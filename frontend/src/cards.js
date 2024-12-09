const cards = [
    {
        id: 1,
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-631154213461762756/original/9e1dc69d-c64f-4052-8dad-6f089fa04b6e.jpeg?im_w=720",
        title: "Paris, France",
        distance: "6,165 ",
        data: "Oct 26-23",
        price: "2,530",
        rating: "4.86"
    },
    {
        id: 2,
        img: "https://a0.muscache.com/im/pictures/51430034/44e710d3_original.jpg?im_w=720",
        title: "Florence, Italy",
        distance: "5,576",
        data: "Dec 16-21",
        price: "143",
        rating: "4.36"
    },
    {
        id: 3,
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-1226427612278140752/original/5a13c34e-1607-4a20-8839-8ef0ea727fd5.jpeg?im_w=720",
        title: "Kuala Lumpur, Malaysia",
        distance: "4,264",
        data: "Nov 3-8",
        price: "49",
        rating: "4.56"
    },
    {
        id: 4,
        img: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/6b2618a6-110d-41bc-89f6-e76761fbaac3.jpg?im_w=720",
        title: "Ubud, Indonesia",
        distance: "6,229",
        data: "Dec 11-16",
        price: "153",
        rating: "4.96"
    },
    {
        id: 5,
        img: "https://a0.muscache.com/im/pictures/2d68ba16-1cce-4a2a-95fa-768aa06cb133.jpg?im_w=720",
        title: "Dubai, UAE",
        distance: "2,009",
        data: "Nov 16-21",
        price: "152",
        rating: "4.86"
    },
    {
        id: 6,
        img: "https://a0.muscache.com/im/pictures/ee9641ec-f525-4726-bf55-04375f34f3fc.jpg?im_w=720",
        title: "Ubud Indonesia",
        distance: "6,226",
        data: "Nov 12-17",
        price: "90",
        rating: "4.44"
    },
    {
        id: 7,
        img: "https://a0.muscache.com/im/pictures/1f1ea519-0c32-4168-ba6b-de0af32146e7.jpg?im_w=720",
        title: "London, UK",
        distance: "6,282",
        data: "Jan 2-7",
        price: "94",
        rating: "4.86"
    },
    {
        id: 8,
        img: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/b2fa6f24-487f-4dd1-808b-3a468937cc49.jpg?im_w=720",
        title: "Budapest, Hungary",
        distance: "4,941",
        data: "Oc 21-26",
        price: "91",
        rating: "4.82"
    },
    {
        id: 9,
        img: "https://a0.muscache.com/im/pictures/bbd4e133-904a-4ec0-9f56-28b458ff22c9.jpg?im_w=720",
        title: "Ubud, Indonesia",
        distance: "6,227",
        data: "Nov 17-21",
        price: "155",
        rating: "4.78"
    },
    {
        id: 10,
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-1206516533184021881/original/e5c554e4-d445-434e-a859-7b29dd4570cf.png?im_w=720",
        title: "Khet Huai Khwany, Thailand",
        distance: "3,329",
        data: "Jan 22-27",
        price: "105",
        rating: "4.46"
    },
    {
        id: 11,
        img: "https://a0.muscache.com/im/pictures/hosting/Hosting-9163225/original/5748e25f-6453-44e4-9f88-d802eb2607f0.jpeg?im_w=720",
        title: "Ubud, Indonesia",
        distance: "6,229",
        data: "Jan 22-27",
        price: "63",
        rating: "4.00"
    },
    {
        id: 12,
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-53753844/original/29b50a37-022a-41a3-a3f2-d0f5d48873f4.jpeg?im_w=720",
        title: "London, Uk",
        distance: "6,286",
        data: "Oct 8-13",
        price: "730",
        rating: "3.22"
    },
    {
        id: 13,
        img: "https://a0.muscache.com/im/pictures/hosting/Hosting-1115642826677928360/original/2c3d5006-a29d-4230-a2ab-a083e57a9c01.jpeg?im_w=720",
        title: "Busan, South Korea",
        distance: "5,041",
        data: "Dec 13-18",
        price: "97",
        rating: "4.55"
    },
    {
        id: 14,
        img: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/02f90f39-6581-4ba3-a328-787ede125d18.jpg?im_w=720",
        title: "Paris, France",
        distance: "6,167",
        data: "Jan 10-15",
        price: "172",
        rating: "4.44"
    },
    {
        id: 15,
        img: "https://a0.muscache.com/im/pictures/78cf4f91-b10a-49d4-ba09-60dcab961d5d.jpg?im_w=720",
        title: "Marrakesh, Morocco",
        distance: "7,587",
        data: "Dec 13-19",
        price: "93",
        rating: "4.91"
    },
    {
        id: 16,
        img: "https://a0.muscache.com/im/pictures/hosting/Hosting-957175607164515153/original/cc2c2c5d-e522-4d24-8862-a6c29e91f723.jpeg?im_w=720",
        title: "Busanm, South Korea",
        distance: "5,041",
        data: "Dec 1-6",
        price: "86",
        rating: "4.82"
    },
    {
        id: 17,
        img: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/d02dfaf1-f5ed-4794-8c7e-319be9452ce5.jpg?im_w=720",
        title: "London, UK",
        distance: "6,287",
        data: "Nov 7-12",
        price: "154",
        rating: "4.65"
    },
    {
        id: 18,
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-47128538/original/0acda462-c3a5-4917-babf-7e98e0f8276e.jpeg?im_w=720",
        title: "Istanbul, Turkey",
        distance: "4,148",
        data: "Nov 26-Dec 1",
        price: "201",
        rating: "4.60"
    },
    {
        id: 19,
        img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAzMjQzODcxMzg5MDAwMzAwNA%3D%3D/original/6201e8c8-788c-4410-889e-e7534619a190.jpeg?im_w=720",
        title: "Dubai, UAE",
        distance: "2,007",
        data: "Fec 9-14",
        price: "181",
        rating: "4.59"
    },
    {
        id: 20,
        img: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/402a93bd-de90-4985-be77-9a5f6ec43e7b.jpg?im_w=720",
        title: "Paris, France",
        distance: "6165",
        data: "Dec 3-8",
        price: "145",
        rating: "4.22"
    },

]

export default cards;