let tasks = [
    {
        id: 1,
        title: "Mobile Wireframes",
        tags: ["Viverra Diam"],
        text: "",
        fileCount: 3,
        priority: "high",
        date: "Apr 12",
    }
    ,
    {
        id: 2,
        title: "User Research",
        tags: ["Maecenas Lacus"],
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque …",
        fileCount: 1,
        priority: "low",
        date: "Mar 4",

    }
    ,
    {
        id: 3,
        title: "Client Call",
        tags: ["Eget Integer"],
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque …",
        fileCount: 0,
        priority: "low",
        date: "Apr 2",

    }
    ,
    {
        id: 4,
        title: "Login Flow",
        tags: ["Nullam Velit"],
        text: "",
        fileCount: 0,
        priority: "medium",
        date: "Apr 2",

    }
    ,
    {
        id: 5,
        title: "Forgot Password Screen",
        tags: ["Nullam Velit"],
        text: "",
        fileCount: 0,
        priority: "low",
        date: "Apr 6",

    }
    ,
    {
        id: 6,
        title: "Landing Page",
        tags: ["Maecenas Lacus"],
        text: "",
        fileCount: 2,
        priority: "low",
        date: "Mar 8",

    }
    ,
    {
        id: 7,
        title: "Annual Persentiton",
        tags: ["Maecenas Lacus"],
        text: "",
        fileCount: 0,
        priority: "low",
        date: "Mar 15",

    }
    ,
    {
        id: 8,
        title: "Icons",
        tags: ["Egent Integer"],
        text: "",
        fileCount: 0,
        priority: "medium",
        date: "Apr 10",

    }
    ,
    {
        id: 9,
        title: "Onboarding Screens",
        tags: ["Maecenas Lacus"],
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque …        ",
        fileCount: 1,
        priority: "high",
        date: "Mar 17",

    }
    ,
    {
        id: 10,
        title: "Annual Persentiton",
        tags: ["Viverra Diam"],
        text: "",
        fileCount: 0,
        priority: "low",
        date: "Mar 2",

    }
    ,
    {
        id: 11,
        title: "Workshop Ideas",
        tags: ["Nullam Velit"],
        text: "",
        fileCount: 0,
        priority: "medium",
        date: "Mar 4",

    }
    ,
    {
        id: 12,
        title: "Navigation",
        tags: ["Nullam Velit"],
        text: "",
        fileCount: 0,
        priority: "high",
        date: "Mar 15",

    }
];
let board =
{
    name: "board1",
    bars: [
        {
            id: 1,
            name: "toDo",
            tasksIds: [1, 2, 3],

        }
        ,
        {
            id: 2,
            name: "inProgress",
            tasksIds: [4, 5]

        }
        ,
        {
            id: 3,
            name: "inReview",
            tasksIds: [6, 7, 8, 9]

        }
        ,
        {
            id: 4,
            name: "done",
            tasksIds: [10, 11, 12]

        }
    ]

}
