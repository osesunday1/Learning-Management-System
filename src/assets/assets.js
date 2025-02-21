import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import search_icon from './search_icon.svg'
import cross_icon from './cross_icon.svg'
import upload_area from './upload_area.svg'
import sketch from './sktech.svg'
import microsoft_logo from './microsoft_logo.svg'
import walmart_logo from './walmart_logo.svg'
import accenture_logo from './accenture_logo.svg'
import adobe_logo from './adobe_logo.svg'
import paypal_logo from './paypal_logo.svg'
import course_1_thumbnail from './course_1.png'
import course_2_thumbnail from './course_2.png'
import course_3_thumbnail from './course_3.png'
import course_4_thumbnail from './course_4.png'
import star from './rating_star.svg'
import star_blank from './star_dull_icon.svg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import arrow_icon from './arrow_icon.svg'
import down_arrow_icon from './down_arrow_icon.svg'
import time_left_clock_icon from './time_left_clock_icon.svg'
import time_clock_icon from './time_clock_icon.svg'
import user_icon from './user_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import my_course_icon from './my_course_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import file_upload_icon from './file_upload_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import dropdown_icon from './dropdown_icon.svg'
import patients_icon from './patients_icon.svg'
import play_icon from './play_icon.svg'
import blue_tick_icon from './blue_tick_icon.svg'
import course_4 from './course_4.png'
import profile_img from './profile_img.png'
import profile_img2 from './profile_img2.png'
import profile_img3 from './profile_img3.png'
import lesson_icon from './lesson_icon.svg'


export const assets = {
    logo,
    search_icon,
    sketch,
    microsoft_logo,
    walmart_logo,
    accenture_logo,
    adobe_logo,
    paypal_logo,
    course_1_thumbnail,
    course_2_thumbnail,
    course_3_thumbnail,
    course_4_thumbnail,
    star,
    star_blank,
    profile_img_1,
    profile_img_2,
    profile_img_3,
    arrow_icon,
    dropdown_icon,
    cross_icon,
    upload_area,
    logo_dark,
    down_arrow_icon,
    time_left_clock_icon,
    time_clock_icon,
    user_icon,
    home_icon,
    add_icon,
    my_course_icon,
    person_tick_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    course_4,
    file_upload_icon,
    appointments_icon,
    earning_icon,
    patients_icon,
    profile_img,
    profile_img2,
    profile_img3,
    play_icon,
    blue_tick_icon,
    lesson_icon
}

export const dummyEducatorData = {
    "_id": "675ac1512100b91a6d9b8b24",
    "name": "GreatStack",
    "email": "user.greatstack@gmail.com",
    "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yclFkaDBOMmFqWnBoTTRBOXZUanZxVlo0aXYifQ",
    "createdAt": "2024-12-12T10:56:17.930Z",
    "updatedAt": "2024-12-12T10:56:17.930Z",
    "__v": 0
}

export const dummyTestimonial = [
    {
        name: 'Donald Jackman',
        role: 'SWE 1 @ Amazon',
        image: assets.profile_img_1,
        rating: 5,
        feedback: 'I\'ve been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.',
    },
    {
        name: 'Richard Nelson',
        role: 'SWE 2 @ Samsung',
        image: assets.profile_img_2,
        rating: 4,
        feedback: 'I\'ve been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.',
    },
    {
        name: 'James Washington',
        role: 'SWE 2 @ Google',
        image: assets.profile_img_3,
        rating: 4.5,
        feedback: 'I\'ve been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.',
    },
];

export const dummyDashboardData = {
    "totalEarnings": 707.38,
"enrolledStudentsData": [
    {
        "courseTitle": "Foundations of a Strong Relationship",
        "student": {
            "_id": "user_1aB2Cd3EfGh4Ij5KlMn6OpQ",
            "name": "John Doe",
            "imageUrl": "https://res.cloudinary.com/dvh9j4utq/image/upload/v1721950115/FIRST_FOLDER/sov4z1bqyjjvmrm2vujg.jpg"
        }
    },
    {
        "courseTitle": "Pre-Marital Counseling: Preparing for a Lifetime Together",
        "student": {
            "_id": "user_7Xy8Z9aBcDeFgHiJkLmNoP",
            "name": "Jane Smith",
            "imageUrl": "https://res.cloudinary.com/dvh9j4utq/image/upload/v1721950434/FIRST_FOLDER/yr83a5kenuchd67xwaph.jpg"
        }
    },
    {
        "courseTitle": "Love Languages & Emotional Connection",
        "student": {
            "_id": "user_0QrStUvWxYzA1B2C3DeFgH",
            "name": "Michael Johnson",
            "imageUrl": "https://res.cloudinary.com/dvh9j4utq/image/upload/v1715786346/cld-sample.jpg"
        }
    },
    {
        "courseTitle": "Conflict Resolution for Couples",
        "student": {
            "_id": "user_4IjKlMnOpQrStUvWxYzA1B",
            "name": "Sarah Williams",
            "imageUrl": "https://img.clerk.com/sample-image-4"
        }
    },
    {
        "courseTitle": "Managing Finances as a Couple",
        "student": {
            "_id": "user_5C3DeFgHiJkLmNoP7Xy8Z9aB",
            "name": "David Brown",
            "imageUrl": "https://img.clerk.com/sample-image-5"
        }
    }
],
    "totalCourses": 8
}

export const dummyStudentEnrolled = [
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "Esther John",
            "imageUrl": "https://res.cloudinary.com/dvh9j4utq/image/upload/v1721950150/FIRST_FOLDER/rle8zuya4uodo8ds8bhn.jpg"
        },
        "courseTitle": "Pre-Marital Counseling",
        "purchaseDate": "2024-12-20T08:39:55.509Z"
    },
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "Abraham Manji",
            "imageUrl": "https://res.cloudinary.com/dvh9j4utq/image/upload/v1721950115/FIRST_FOLDER/sov4z1bqyjjvmrm2vujg.jpg"
        },
        "courseTitle": "Managing Finances as a Couple",
        "purchaseDate": "2024-12-20T08:59:49.964Z"
    },
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "Timothy Silas",
            "imageUrl": "https://res.cloudinary.com/dvh9j4utq/image/upload/v1721950434/FIRST_FOLDER/yr83a5kenuchd67xwaph.jpg"
        },
        "courseTitle": "Foundations of a Strong Relationship",
        "purchaseDate": "2024-12-20T11:03:42.931Z"
    },
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "Rebecca Peter",
            "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
        },
        "courseTitle": "Managing Finances as a Couple",
        "purchaseDate": "2024-12-20T11:04:48.798Z"
    }
]

export const dummyCourses = [
    {
        "_id": "605c72efb3f1c2b1f8e4e1a1",
        "courseTitle": "Foundations of a Strong Relationship",
        "courseDescription": "<h2>Building a Lasting Bond</h2><p>Every successful relationship starts with a strong foundation. In this course, you will explore the key elements of a healthy partnership, including communication, trust, and emotional connection.</p><p>Designed for couples at any stage of their relationship, this course provides practical insights and exercises to help you strengthen your bond.</p><ul><li>Develop strong communication skills</li><li>Understand emotional needs in a relationship</li><li>Learn how to resolve conflicts effectively</li></ul>",
        "coursePrice": 49.99,
        "isPublished": true,
        "discount": 20,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "The Essentials of a Healthy Relationship",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "What Makes a Relationship Strong?",
                        "lectureDuration": 16,
                        "lectureUrl": "https://www.youtube.com/watch?v=ft8xLw2L_RA",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Effective Communication in Relationships",
                        "lectureDuration": 19,
                        "lectureUrl": "https://www.youtube.com/watch?v=LcTBdemn-y0",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Trust & Emotional Connection",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Building and Maintaining Trust",
                        "lectureDuration": 20,
                        "lectureUrl": "https://www.youtube.com/watch?v=iJ0NZrEaaQo",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "The Role of Emotional Intelligence in Love",
                        "lectureDuration": 10,
                        "lectureUrl": "https://www.youtube.com/watch?v=C-UVxH19tb4",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [
            "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "user_2qjlgkAqIMpiR2flWIRzvWKtE0w"
        ],
        "courseRatings": [
            {
                "userId": "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
                "rating": 5,
                "_id": "6773e37360cb0ab974342314"
            }
        ],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/ft8xLw2L_RA/maxresdefault.jpg"
    },
    {
        "_id": "605c72efb3f1c2b1f8e4e1a2",
        "courseTitle": "Pre-Marital Counseling: Preparing for a Lifetime Together",
        "courseDescription": "<h2>Set Your Marriage Up for Success</h2><p>Marriage is a lifelong commitment that requires preparation. This course provides couples with tools to navigate their future together, from communication to financial planning.</p><p>By the end of this course, you and your partner will be better equipped to handle challenges and build a fulfilling marriage.</p><ul><li>Understand key marital expectations</li><li>Develop strategies for handling conflict</li><li>Discuss financial and family planning</li></ul>",
        "coursePrice": 59.99,
        "isPublished": true,
        "discount": 15,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Building a Marriage on Strong Foundations",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Understanding Your Partner’s Expectations",
                        "lectureDuration": 14,
                        "lectureUrl": "https://youtu.be/someurl",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Creating a Shared Vision for the Future",
                        "lectureDuration": 18,
                        "lectureUrl": "https://youtu.be/someurl2",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Financial Planning and Conflict Resolution",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Managing Finances as a Team",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl3",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Resolving Disputes with Love & Respect",
                        "lectureDuration": 17,
                        "lectureUrl": "https://youtu.be/someurl4",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [
            "user_1jkhjQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "user_3kljgkAqIMpiR2flWIRzvWKtE0w"
        ],
        "courseRatings": [
            {
                "userId": "user_3kljgkAqIMpiR2flWIRzvWKtE0w",
                "rating": 4.5,
                "_id": "6773e37360cb0ab974342315"
            }
        ],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/LcTBdemn-y0/maxresdefault.jpg"
    },
    {
        "_id": "605c72efb3f1c2b1f8e4e1a3",
        "courseTitle": "Love Languages & Emotional Connection",
        "courseDescription": "<h2>Speak Your Partner’s Love Language</h2><p>Every individual expresses and receives love differently. This course helps couples understand the five love languages and how to apply them for deeper emotional intimacy.</p><p>By the end of this course, you and your partner will be able to identify each other's love languages and improve emotional expression.</p><ul><li>Identify your and your partner's love language</li><li>Improve emotional expression</li><li>Strengthen intimacy and connection</li></ul>",
        "coursePrice": 45.00,
        "isPublished": true,
        "discount": 10,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Discovering Your Love Language",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Understanding the Five Love Languages",
                        "lectureDuration": 15,
                        "lectureUrl": "https://www.youtube.com/watch?v=cbqM5ITIy8s",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Expressing Love in Meaningful Ways",
                        "lectureDuration": 18,
                        "lectureUrl": "https://www.youtube.com/watch?v=eF8fsqRkwtY",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Strengthening Emotional Connection",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Deepening Emotional Intimacy",
                        "lectureDuration": 20,
                        "lectureUrl": "https://www.youtube.com/watch?v=vuemQQ6-2SE",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Applying Love Languages Daily",
                        "lectureDuration": 12,
                        "lectureUrl": "https://www.youtube.com/watch?v=whxbov1wpa4",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/iJ0NZrEaaQo/maxresdefault.jpg"
    },

    {
        "_id": "605c72efb3f1c2b1f8e4e1a4",
        "courseTitle": "Conflict Resolution for Couples",
        "courseDescription": "<h2>Handle Disagreements with Love</h2><p>Conflicts are inevitable in any relationship, but they don’t have to lead to disconnect. This course teaches couples how to handle disputes with respect and understanding.</p><p>By the end of this course, you and your partner will be able to turn conflicts into opportunities for growth and deeper connection.</p><ul><li>Learn healthy conflict resolution techniques</li><li>Turn disagreements into productive conversations</li><li>Strengthen mutual understanding and respect</li></ul>",
        "coursePrice": 55.00,
        "isPublished": true,
        "discount": 12,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "The Art of Healthy Conflict Resolution",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Why Conflicts Happen in Relationships",
                        "lectureDuration": 20,
                        "lectureUrl": "https://youtu.be/someurl7",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Effective Listening in Arguments",
                        "lectureDuration": 18,
                        "lectureUrl": "https://youtu.be/someurl8",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Turning Conflicts into Growth",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Building a Culture of Understanding",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl9",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Techniques for De-escalating Tension",
                        "lectureDuration": 17,
                        "lectureUrl": "https://youtu.be/someurl10",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/nAxZ0efK8W0/maxresdefault.jpg"
    },
    {
        "_id": "605c72efb3f1c2b1f8e4e1a5",
        "courseTitle": "Rekindling Romance & Intimacy",
        "courseDescription": "<h2>Bring Back the Spark</h2><p>Over time, relationships evolve, and couples may find themselves feeling distant. This course provides strategies to revive passion and closeness.</p><p>By the end of this course, you and your partner will have practical techniques to keep the romance alive and maintain emotional and physical intimacy.</p><ul><li>Rediscover emotional and physical intimacy</li><li>Learn techniques to reignite passion</li><li>Deepen your connection through meaningful gestures</li></ul>",
        "coursePrice": 60.00,
        "isPublished": true,
        "discount": 18,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "The Science of Love & Intimacy",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Why Romance Fades and How to Revive It",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl11",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Rekindling Emotional Connection",
                        "lectureDuration": 19,
                        "lectureUrl": "https://youtu.be/someurl12",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Physical & Emotional Intimacy",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Building a Habit of Affection",
                        "lectureDuration": 20,
                        "lectureUrl": "https://youtu.be/someurl13",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "The Role of Small Acts of Love",
                        "lectureDuration": 16,
                        "lectureUrl": "https://youtu.be/someurl14",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/C-UVxH19tb4/maxresdefault.jpg"
    },

    {
        "_id": "605c72efb3f1c2b1f8e4e1a6",
        "courseTitle": "Parenting as a Team: Raising Kids Together",
        "courseDescription": "<h2>Strengthening Your Relationship While Parenting</h2><p>Parenting can be a rewarding but challenging journey. This course helps couples align their parenting styles, improve communication, and support each other while raising children.</p><p>By the end of this course, you and your partner will have the tools to co-parent effectively while maintaining a strong and loving relationship.</p><ul><li>Align parenting philosophies and approaches</li><li>Improve teamwork in raising children</li><li>Maintain intimacy while managing parenting responsibilities</li></ul>",
        "coursePrice": 65.00,
        "isPublished": true,
        "discount": 15,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Building a United Parenting Front",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Understanding Each Other’s Parenting Styles",
                        "lectureDuration": 21,
                        "lectureUrl": "https://youtu.be/someurl15",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Balancing Discipline and Affection",
                        "lectureDuration": 18,
                        "lectureUrl": "https://youtu.be/someurl16",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Keeping Your Relationship Strong While Parenting",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Making Time for Each Other Amid Parenting",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl17",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "How to Support Each Other as Parents",
                        "lectureDuration": 17,
                        "lectureUrl": "https://youtu.be/someurl18",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/cbqM5ITIy8s/maxresdefault.jpg"
    },
    {
        "_id": "605c72efb3f1c2b1f8e4e1a7",
        "courseTitle": "Healing from Betrayal & Rebuilding Trust",
        "courseDescription": "<h2>Rebuilding Trust and Moving Forward</h2><p>Trust is the foundation of any relationship. If you've experienced betrayal or infidelity, this course provides step-by-step guidance on rebuilding trust and healing together.</p><p>By the end of this course, you and your partner will understand how to restore trust and strengthen your relationship after a breach of faith.</p><ul><li>Learn the psychology behind betrayal</li><li>Develop effective trust-building strategies</li><li>Communicate openly to heal emotional wounds</li></ul>",
        "coursePrice": 70.00,
        "isPublished": true,
        "discount": 20,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Understanding Betrayal and Emotional Healing",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Why Betrayal Hurts and How to Process It",
                        "lectureDuration": 23,
                        "lectureUrl": "https://youtu.be/someurl19",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "The First Steps to Emotional Healing",
                        "lectureDuration": 19,
                        "lectureUrl": "https://youtu.be/someurl20",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Restoring Trust and Rebuilding Your Relationship",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Communicating Openly After Betrayal",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl21",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Practical Steps to Strengthen Trust Again",
                        "lectureDuration": 17,
                        "lectureUrl": "https://youtu.be/someurl22",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/eF8fsqRkwtY/maxresdefault.jpg"
    },

    {
        "_id": "605c72efb3f1c2b1f8e4e1a8",
        "courseTitle": "Managing Finances as a Couple",
        "courseDescription": "<h2>Building Financial Harmony Together</h2><p>Money matters can be a major source of conflict in relationships. This course helps couples develop healthy financial habits, set joint goals, and manage money effectively.</p><p>By the end of this course, you and your partner will have the tools to navigate financial discussions and create a stable financial future together.</p><ul><li>Develop a shared financial vision</li><li>Learn budgeting and expense tracking techniques</li><li>Manage financial conflicts with healthy communication</li></ul>",
        "coursePrice": 75.00,
        "isPublished": true,
        "discount": 15,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Creating a Financially Stable Relationship",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Understanding Each Other’s Money Mindset",
                        "lectureDuration": 25,
                        "lectureUrl": "https://youtu.be/someurl23",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Building a Budget That Works for Both of You",
                        "lectureDuration": 20,
                        "lectureUrl": "https://youtu.be/someurl24",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Resolving Money Conflicts in Relationships",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "How to Discuss Finances Without Arguing",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl25",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Planning for Long-Term Financial Success",
                        "lectureDuration": 18,
                        "lectureUrl": "https://youtu.be/someurl26",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/vuemQQ6-2SE/maxresdefault.jpg"
    },

    {
        "_id": "605c72efb3f1c2b1f8e4e1a9",
        "courseTitle": "Marriage Tune-Up: Strengthening Your Bond",
        "courseDescription": "<h2>Keep Your Relationship Thriving</h2><p>Every marriage needs care and attention to stay strong. This course provides couples with strategies to refresh their connection, address minor concerns before they become major, and keep their relationship healthy.</p><p>By the end of this course, you and your partner will have a renewed sense of connection and practical tools to maintain a happy and fulfilling marriage.</p><ul><li>Identify areas of growth in your relationship</li><li>Improve day-to-day communication and intimacy</li><li>Set goals for a long-lasting, loving partnership</li></ul>",
        "coursePrice": 68.00,
        "isPublished": true,
        "discount": 18,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Refreshing Your Marriage",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "How to Reconnect Emotionally",
                        "lectureDuration": 24,
                        "lectureUrl": "https://youtu.be/someurl27",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Practicing Gratitude and Appreciation",
                        "lectureDuration": 19,
                        "lectureUrl": "https://youtu.be/someurl28",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Keeping the Romance Alive",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Daily Habits for a Stronger Marriage",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl29",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Planning for Long-Term Relationship Success",
                        "lectureDuration": 18,
                        "lectureUrl": "https://youtu.be/someurl30",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/whxbov1wpa4/maxresdefault.jpg"
    },

    {
        "_id": "605c72efb3f1c2b1f8e4e1b0",
        "courseTitle": "Navigating Long-Distance Relationships",
        "courseDescription": "<h2>Stay Connected, No Matter the Distance</h2><p>Whether you're temporarily apart or in a long-term distance relationship, this course provides strategies for maintaining closeness, improving communication, and overcoming challenges while being miles away.</p><p>By the end of this course, you and your partner will have practical tools to keep your relationship strong despite the distance.</p><ul><li>Improve virtual and emotional communication</li><li>Maintain intimacy in a long-distance setup</li><li>Plan for a future together while apart</li></ul>",
        "coursePrice": 65.00,
        "isPublished": true,
        "discount": 15,
        "courseContent": [
            {
                "chapterId": "chapter1",
                "chapterOrder": 1,
                "chapterTitle": "Understanding Long-Distance Relationship Challenges",
                "chapterContent": [
                    {
                        "lectureId": "lecture1",
                        "lectureTitle": "Why Long-Distance Relationships Can Be Difficult",
                        "lectureDuration": 20,
                        "lectureUrl": "https://youtu.be/someurl31",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture2",
                        "lectureTitle": "Setting Expectations and Boundaries",
                        "lectureDuration": 18,
                        "lectureUrl": "https://youtu.be/someurl32",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            },
            {
                "chapterId": "chapter2",
                "chapterOrder": 2,
                "chapterTitle": "Keeping the Connection Strong",
                "chapterContent": [
                    {
                        "lectureId": "lecture3",
                        "lectureTitle": "Creative Ways to Stay Emotionally Close",
                        "lectureDuration": 22,
                        "lectureUrl": "https://youtu.be/someurl33",
                        "isPreviewFree": true,
                        "lectureOrder": 1
                    },
                    {
                        "lectureId": "lecture4",
                        "lectureTitle": "Planning for the Future and Reunion",
                        "lectureDuration": 17,
                        "lectureUrl": "https://youtu.be/someurl34",
                        "isPreviewFree": false,
                        "lectureOrder": 2
                    }
                ]
            }
        ],
        "educator": "675ac1512100b91a6d9b8b24",
        "enrolledStudents": [],
        "courseRatings": [],
        "createdAt": "2024-12-17T08:16:53.622Z",
        "updatedAt": "2025-01-02T04:47:44.701Z",
        "__v": 4,
        "courseThumbnail": "https://img.youtube.com/vi/u6sUSVfjFGc/maxresdefault.jpg"
    }




];