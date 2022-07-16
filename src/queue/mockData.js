const image_bundle = {
    1: [
        { id: 11, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    2: [
        { id: 21, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 22, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    3: [
        { id: 31, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 32, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 33, thumb: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    4: [
        { id: 41, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 42, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 43, thumb: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 44, thumb: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }



    ],
    5: [
        { id: 51, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 52, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 53, thumb: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 54, thumb: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 55, thumb: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },


        { id: 51, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 52, thumb: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 53, thumb: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 54, thumb: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 55, thumb: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    ]
};
export const posts_mock = [
    {
        id: 1,
        title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        user: {
            id: 1,
            name: 'Kauser Sarker',
            thumb: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        images: image_bundle[1]
    },

    {
        id: 2,
        title: 'It is a long established fact that a reader will be distracted by ',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        user: {
            id: 2,
            name: 'Andrew Philip',
            thumb: 'https://www.w3schools.com/howto/img_avatar2.png'
        },
        images: image_bundle[2]
    },


    {
        id: 3,
        title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit ",
        user: {
            id: 3,
            name: 'Sheldon Couper',
            thumb: 'https://www.w3schools.com/howto/img_avatar.png'
        },

        images: image_bundle[3]
    },
    {
        id: 4,
        title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. L',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        user: {
            id: 1,
            name: 'Kauser Sarker',
            thumb: 'https://via.placeholder.com/250'
        },
        images: image_bundle[4]
    },

    {
        id: 5,
        title: 'It is a long established fact that a reader will be distracted',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        user: {
            id: 2,
            name: 'Andrew Philip',
            thumb: 'https://via.placeholder.com/250'
        },
        images: image_bundle[5]
    },


    {
        id: 6,
        title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit ",
        user: {
            id: 3,
            name: 'Sheldon Couper',
            thumb: 'https://via.placeholder.com/250'
        },
        images: image_bundle[5]
    },


    {
        id: 7,
        title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        user: {
            id: 1,
            name: 'Kauser Sarker',
            thumb: 'https://via.placeholder.com/250'
        },
        images: image_bundle[5]
    },

    {
        id: 8,
        title: 'It is a long established fact that a reader will be distracted by the readable content ',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        user: {
            id: 2,
            name: 'Andrew Philip',
            thumb: 'https://via.placeholder.com/250'
        },
        images: image_bundle[5]
    },


    {
        id: 9,
        title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit ",
        user: {
            id: 3,
            name: 'Sheldon Couper',
            thumb: 'https://via.placeholder.com/250'
        },
        images: image_bundle[5]
    }
];