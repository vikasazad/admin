"use client";
import { LoginAuth } from "../../../actions/loginAuth";
import {
  updateUser,
  registerUser,
  getData,
  getRoomData,
  get7daysDataFromAll,
  getLiveData,
  handleRoomStaffInformation,
} from "../../DB/dbFunctions";
import { hash } from "bcryptjs";

export default function Test() {
  const hotelData = {
    rooms: [
      {
        roomType: "Deluxe",
        totalRooms: 50,
        description: "Spacious room with city view and modern amenities",
        images: [
          "https://example.com/deluxe-room1.jpg",
          "https://example.com/deluxe-room2.jpg",
        ],
        roomNo: ["101", "102", "103", "104", "105"],
        discount: {
          type: "percentage",
          amount: 10,
          code: "SUMMER10",
        },
        price: "250.00",
        amenities: ["WiFi", "TV", "AC", "Mini Bar", "Service"],
      },
    ],
    history: [
      {
        bookingDetails: {
          customer: {
            name: "vipin",
            email: "tanejavipin@gmail.com",
            phone: "+918897562548",
            address: "26 lokhand wala circle, parel mumbai",
          },
          location: "101",
          roomType: "Deluxe",
          aggregator: "makeMyTrip",
          aggregatorLogo:
            "https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg",
          bookingDate: "2024-09-21T15:47:00.000Z",
          checkIn: "2024-09-25T04:47:00.000Z",
          checkOut: "2024-09-26T04:47:00.000Z",
          noOfGuests: "2",
          noOfRoom: "1",
          inclusions: "taxes, wifi, breakfast",
          specialRequirements: "Late check-out requested",
          bookingId: "BO:123",
          attendant: "Mishra",
          status: "Checked Out",
          payment: {
            mode: "credit card",
            paymentId: "BOO24092001",
            price: "750",
            priceAfterDiscount: "675",
            timeOfTransaction: "2024-10-02T07:00:00.000Z",
            paymentStatus: "complete",
            gst: {
              gstAmount: "100",
              gstPercentage: "18%",
              cgstAmount: "50",
              cgstPercentage: "9%",
              sgstAmount: "50",
              sgstPercentage: "9%",
            },
            discount: {
              type: "percentage",
              amount: 10,
              code: "SUMMER10",
            },
          },
        },
        servicesUsed: {
          massage: {
            serviceId: "SE:123",
            status: "in progress",
            serviceName: "Swedish Massage",
            type: "massage",
            requestTime: "2024-09-25T08:47:00.000Z",
            startTime: "2024-09-25T11:47:00.000Z",
            endTime: "2024-09-25T12:47:00.000Z",
            price: "80",
            attendant: "Sarah Johnson",
            payment: {
              transctionId: "XUSie83",
              paymentStatus: "on checkout",
              mode: "room charge",
              paymentId: "SPA24092101",
              timeOfTransaction: "2024-10-02T07:00:00.000Z",
              price: "80",
              priceAfterDiscount: "72",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "percentage",
                amount: 10,
                code: "SPAWEEKEND",
              },
            },
          },
        },
        diningDetails: {
          orders: [
            {
              specialRequirement: "Make pina collada extra sour",
              items: [
                {
                  itemId: "kdi2",
                  itemName: "Club Sandwich",
                  portionSize: "Regular",
                  price: "15",
                },
                {
                  itemId: "iosn3r3",
                  itemName: "Caesar Salad",
                  portionSize: "Large",
                  price: "12",
                },
              ],
              orderId: "OR:RO24",
              attendant: "Michael Brown",
              status: "completed",
              timeOfRequest: "2024-10-03T10:10:00.000Z",
              timeOfFullfilment: "2024-10-03T10:25:00.000Z",
              payment: {
                transctionId: "XUSie83",
                paymentStatus: "pending",
                mode: "room charge",
                paymentId: "RO24092101",
                price: "27",
                priceAfterDiscount: "27",
                timeOfTransaction: "2024-10-02T07:00:00.000Z",
                gst: {
                  gstAmount: "100",
                  gstPercentage: "18%",
                  cgstAmount: "50",
                  cgstPercentage: "9%",
                  sgstAmount: "50",
                  sgstPercentage: "9%",
                },
                discount: {
                  type: "none",
                  amount: 0,
                  code: "",
                },
              },
            },
          ],
        },
        issuesReported: {
          maintenance: {
            issueId: "IS:123",
            status: "Completed",
            category: "maintenance",
            name: "Leaky Faucet",
            description: "Bathroom sink faucet is dripping",
            reportTime: "2024-09-25T09:47:00.000Z",
            resolutionTime: "2024-09-25T10:00:00.000Z",
            attendant: "Robert Lee",
          },
        },
        transctions: [
          {
            location: "104",
            against: "SE:7889",
            attendant: "Mishra",
            bookingId: "BO:123",
            payment: {
              paymentStatus: "complete",
              mode: "online",
              paymentId: "TXN123456",
              timeOfTransaction: "2024-09-29T10:00:00.000Z",
              price: "30",
              priceAfterDiscount: "27",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "coupon",
                amount: 3,
                code: "SAVE10",
              },
            },
          },
        ],
      },
    ],
    reservation: [
      {
        bookingDetails: {
          customer: {
            name: "vipin",
            email: "tanejavipin@gmail.com",
            phone: "+918897562548",
            address: "26 lokhand wala circle, parel mumbai",
          },
          roomType: "Deluxe",
          noOfRoom: "1",
          inclusions: "taxes, wifi, breakfast",
          bookingId: "BO:123",
          aggregator: "makeMyTrip",
          aggregatorLogo:
            "https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg",
          bookingDate: '"2024-09-21T15:47:00.000Z"',
          checkIn: "2024-09-25T04:47:00.000Z",
          checkOut: "2024-09-26T04:47:00.000Z",
          specialRequirements: "Non-smoking room",
          status: "Checking In",
          noOfGuests: "2",
          payment: {
            gst: {
              gstAmount: "100",
              gstPercentage: "18%",
              cgstAmount: "50",
              cgstPercentage: "9%",
              sgstAmount: "50",
              sgstPercentage: "9%",
            },
            mode: "online",
            price: "500",
            priceAfterDiscount: "450",
            paymentId: "BOO24092001",
            timeOfTransaction: "2024-10-02T07:00:00.000Z",
            paymentStatus: "complete",
            discount: {
              type: "percentage",
              amount: 10,
              code: "FALL10",
            },
          },
        },
        transctions: [
          {
            location: "104",
            against: "SE:7889",
            attendant: "Mishra",
            bookingId: "BO:123",
            payment: {
              paymentStatus: "complete",
              mode: "online",
              paymentId: "TXN123456",
              timeOfTransaction: "2024-09-29T10:00:00.000Z",
              price: "30",
              priceAfterDiscount: "27",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "coupon",
                amount: 3,
                code: "SAVE10",
              },
            },
          },
        ],
      },
    ],
    services: {
      categories: {
        roomupgrades: {
          roomupgrades: [
            {
              typeName: "Room Upgrades",
              description: "You can upgrade into new room with minimal price",
              availableOptions: [
                {
                  name: "deluxe",
                  price: 90,
                  images: [],
                  amenities: [],
                  discount: "new year",
                },
              ],
            },
          ],
        },
        wellness: {
          messages: [
            {
              typeName: "Swedish Massage",
              description:
                "Relaxing full-body massage to reduce stress and tension",
              price: 80,
              startTime: "10:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
            {
              typeName: "Deep Tissue Massage",
              description: "Intensive massage targeting deep muscle layers",
              price: 95,
              startTime: "10:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
            {
              typeName: "Hot Stone Massage",
              description: "Therapeutic massage using heated stones",
              price: 110,
              startTime: "11:00",
              endTime: "19:00",
              duration: "75 minutes",
            },
            {
              typeName: "Aromatherapy Massage",
              description: "Relaxing massage with essential oils",
              price: 90,
              startTime: "10:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
          ],
          facialTreatments: [
            {
              typeName: "Customized Facial",
              description: "Personalized facial treatment for your skin type",
              price: 75,
              startTime: "09:00",
              endTime: "18:00",
              duration: "45 minutes",
            },
            {
              typeName: "Anti-Aging Facial",
              description: "Advanced facial to reduce signs of aging",
              price: 120,
              startTime: "10:00",
              endTime: "19:00",
              duration: "75 minutes",
            },
          ],
          bodyTreatments: [
            {
              typeName: "Full Body Scrub",
              description: "Exfoliating treatment for smooth, glowing skin",
              price: 85,
              startTime: "11:00",
              endTime: "18:00",
              duration: "60 minutes",
            },
          ],
          hydrotherapy: [
            {
              typeName: "Hydrotherapy Session",
              description: "Therapeutic water-based treatment",
              price: 65,
              startTime: "09:00",
              endTime: "21:00",
              duration: "45 minutes",
            },
          ],
          personalTraining: [
            {
              typeName: "Personal Training Session",
              description:
                "One-on-one fitness session with a certified trainer",
              price: 70,
              startTime: "06:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
          ],
          groupClasses: [
            {
              typeName: "Group Yoga Class",
              description: "Instructor-led yoga session for all levels",
              price: 20,
              startTime: "07:00",
              endTime: "19:00",
              duration: "60 minutes",
            },
            {
              typeName: "Group Pilates Class",
              description: "Core-strengthening Pilates session",
              price: 25,
              startTime: "08:00",
              endTime: "18:00",
              duration: "45 minutes",
            },
          ],
          outdoorActivities: [
            {
              typeName: "Guided Nature Hike",
              description: "Scenic outdoor hike with an experienced guide",
              price: 40,
              startTime: "08:00",
              endTime: "16:00",
              duration: "120 minutes",
            },
          ],
          detoxPrograms: [
            {
              typeName: "3-Day Detox Program",
              description:
                "Comprehensive detoxification program including specialized diet and treatments",
              price: 450,
              duration: "3 days",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          weightLossPrograms: [
            {
              typeName: "Nutrition Consultation",
              description: "Personalized dietary advice from a nutritionist",
              price: 85,
              startTime: "09:00",
              endTime: "17:00",
              duration: "60 minutes",
            },
          ],
          stressManagementPrograms: [
            {
              typeName: "Guided Meditation Session",
              description: "Learn and practice meditation techniques",
              price: 30,
              startTime: "07:00",
              endTime: "20:00",
              duration: "45 minutes",
            },
          ],
          hairAndNailSalons: [
            {
              typeName: "Professional Hair Styling",
              description: "Haircut and styling by experienced stylists",
              price: 60,
              startTime: "09:00",
              endTime: "19:00",
              duration: "60 minutes",
            },
            {
              typeName: "Classic Manicure",
              description: "Nail care and polish for hands",
              price: 35,
              startTime: "10:00",
              endTime: "18:00",
              duration: "45 minutes",
            },
          ],
          makeupServices: [
            {
              typeName: "Professional Makeup Application",
              description: "Expert makeup application for any occasion",
              price: 75,
              duration: "60 minutes",
              startTime: "09:00",
              endTime: "20:00",
            },
          ],
          acupuncture: [
            {
              typeName: "Acupuncture Session",
              description: "Traditional Chinese medicine treatment",
              price: 90,
              startTime: "10:00",
              endTime: "18:00",
              duration: "60 minutes",
            },
          ],
          reiki: [
            {
              typeName: "Reiki Healing Session",
              description: "Energy healing treatment for relaxation",
              price: 70,
              startTime: "11:00",
              endTime: "19:00",
              duration: "60 minutes",
            },
          ],
          ayurveda: [
            {
              typeName: "Ayurvedic Consultation",
              description: "Personalized Ayurvedic health assessment",
              price: 100,
              startTime: "09:00",
              endTime: "17:00",
              duration: "90 minutes",
            },
          ],
          juiceBars: [
            {
              typeName: "Fresh Pressed Juice",
              description:
                "Healthy, freshly squeezed fruit and vegetable juices",
              price: 8,
              startTime: "07:00",
              endTime: "21:00",
              duration: "5 minutes",
            },
          ],
          meditationSessions: [
            {
              typeName: "Guided Meditation Sessions",
              description:
                "Expert-led meditation sessions for relaxation and mindfulness",
              price: 30,
              duration: "45 minutes",
              startTime: "07:00",
              endTime: "20:00",
            },
          ],
          relaxationLounges: [
            {
              typeName: "Stress Reduction Workshop",
              description:
                "Group workshop teaching various stress management techniques",
              price: 75,
              duration: "3 hours",
              startTime: "14:00",
              endTime: "17:00",
            },
          ],
          sleepPrograms: [
            {
              typeName: "Sleep Enhancement Package",
              description: "Comprehensive program to improve sleep quality",
              price: 200,
              duration: "1 week",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          wellnessRetreats: [
            {
              typeName: "Weekend Wellness Retreat",
              description:
                "Immersive wellness experience including various treatments and activities",
              price: 600,
              duration: "2 days",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          healthAndWellnessSeminars: [
            {
              typeName: "Health and Wellness Educational Seminars",
              description:
                "Informative seminars on various health and wellness topics",
              price: 50,
              duration: "90 minutes",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          chiropracticServices: [
            {
              typeName: "Chiropractic Assessment and Treatment",
              description:
                "Initial consultation and treatment with a licensed chiropractor",
              price: 120,
              duration: "60 minutes",
              startTime: "09:00",
              endTime: "17:00",
            },
          ],
          physicalTherapy: [
            {
              typeName: "Physical Therapy Evaluation and Treatment",
              description:
                "One-on-one session with a licensed physical therapist",
              price: 110,
              duration: "60 minutes",
              startTime: "08:00",
              endTime: "18:00",
            },
          ],
          craniosacralTherapy: [
            {
              typeName: "Craniosacral Therapy Session",
              description:
                "Gentle bodywork focusing on the craniosacral system",
              price: 95,
              duration: "60 minutes",
              startTime: "10:00",
              endTime: "18:00",
            },
          ],
          waterAerobics: [
            {
              typeName: "Group Water Aerobics",
              description: "Low-impact fitness class conducted in the pool",
              price: 25,
              duration: "45 minutes",
              startTime: "09:00",
              endTime: "11:00",
            },
          ],
          saunasAndSteamRooms: [
            {
              typeName: "Private Sauna Experience",
              description: "Relaxing session in a private sauna",
              price: 30,
              duration: "30 minutes",
              startTime: "07:00",
              endTime: "21:00",
            },
          ],
        },
        recreational: {
          messages: [
            {
              typeName: "Swedish Massage",
              description:
                "Relaxing full-body massage to reduce stress and tension",
              price: 80,
              startTime: "10:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
            {
              typeName: "Deep Tissue Massage",
              description: "Intensive massage targeting deep muscle layers",
              price: 95,
              startTime: "10:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
            {
              typeName: "Hot Stone Massage",
              description: "Therapeutic massage using heated stones",
              price: 110,
              startTime: "11:00",
              endTime: "19:00",
              duration: "75 minutes",
            },
            {
              typeName: "Aromatherapy Massage",
              description: "Relaxing massage with essential oils",
              price: 90,
              startTime: "10:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
          ],
          facialTreatments: [
            {
              typeName: "Customized Facial",
              description: "Personalized facial treatment for your skin type",
              price: 75,
              startTime: "09:00",
              endTime: "18:00",
              duration: "45 minutes",
            },
            {
              typeName: "Anti-Aging Facial",
              description: "Advanced facial to reduce signs of aging",
              price: 120,
              startTime: "10:00",
              endTime: "19:00",
              duration: "75 minutes",
            },
          ],
          bodyTreatments: [
            {
              typeName: "Full Body Scrub",
              description: "Exfoliating treatment for smooth, glowing skin",
              price: 85,
              startTime: "11:00",
              endTime: "18:00",
              duration: "60 minutes",
            },
          ],
          hydrotherapy: [
            {
              typeName: "Hydrotherapy Session",
              description: "Therapeutic water-based treatment",
              price: 65,
              startTime: "09:00",
              endTime: "21:00",
              duration: "45 minutes",
            },
          ],
          personalTraining: [
            {
              typeName: "Personal Training Session",
              description:
                "One-on-one fitness session with a certified trainer",
              price: 70,
              startTime: "06:00",
              endTime: "20:00",
              duration: "60 minutes",
            },
          ],
          groupClasses: [
            {
              typeName: "Group Yoga Class",
              description: "Instructor-led yoga session for all levels",
              price: 20,
              startTime: "07:00",
              endTime: "19:00",
              duration: "60 minutes",
            },
            {
              typeName: "Group Pilates Class",
              description: "Core-strengthening Pilates session",
              price: 25,
              startTime: "08:00",
              endTime: "18:00",
              duration: "45 minutes",
            },
          ],
          outdoorActivities: [
            {
              typeName: "Guided Nature Hike",
              description: "Scenic outdoor hike with an experienced guide",
              price: 40,
              startTime: "08:00",
              endTime: "16:00",
              duration: "120 minutes",
            },
          ],
          detoxPrograms: [
            {
              typeName: "3-Day Detox Program",
              description:
                "Comprehensive detoxification program including specialized diet and treatments",
              price: 450,
              duration: "3 days",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          weightLossPrograms: [
            {
              typeName: "Nutrition Consultation",
              description: "Personalized dietary advice from a nutritionist",
              price: 85,
              startTime: "09:00",
              endTime: "17:00",
              duration: "60 minutes",
            },
          ],
          stressManagementPrograms: [
            {
              typeName: "Guided Meditation Session",
              description: "Learn and practice meditation techniques",
              price: 30,
              startTime: "07:00",
              endTime: "20:00",
              duration: "45 minutes",
            },
          ],
          hairAndNailSalons: [
            {
              typeName: "Professional Hair Styling",
              description: "Haircut and styling by experienced stylists",
              price: 60,
              startTime: "09:00",
              endTime: "19:00",
              duration: "60 minutes",
            },
            {
              typeName: "Classic Manicure",
              description: "Nail care and polish for hands",
              price: 35,
              startTime: "10:00",
              endTime: "18:00",
              duration: "45 minutes",
            },
          ],
          makeupServices: [
            {
              typeName: "Professional Makeup Application",
              description: "Expert makeup application for any occasion",
              price: 75,
              duration: "60 minutes",
              startTime: "09:00",
              endTime: "20:00",
            },
          ],
          acupuncture: [
            {
              typeName: "Acupuncture Session",
              description: "Traditional Chinese medicine treatment",
              price: 90,
              startTime: "10:00",
              endTime: "18:00",
              duration: "60 minutes",
            },
          ],
          reiki: [
            {
              typeName: "Reiki Healing Session",
              description: "Energy healing treatment for relaxation",
              price: 70,
              startTime: "11:00",
              endTime: "19:00",
              duration: "60 minutes",
            },
          ],
          ayurveda: [
            {
              typeName: "Ayurvedic Consultation",
              description: "Personalized Ayurvedic health assessment",
              price: 100,
              startTime: "09:00",
              endTime: "17:00",
              duration: "90 minutes",
            },
          ],
          juiceBars: [
            {
              typeName: "Fresh Pressed Juice",
              description:
                "Healthy, freshly squeezed fruit and vegetable juices",
              price: 8,
              startTime: "07:00",
              endTime: "21:00",
              duration: "5 minutes",
            },
          ],
          meditationSessions: [
            {
              typeName: "Guided Meditation Sessions",
              description:
                "Expert-led meditation sessions for relaxation and mindfulness",
              price: 30,
              duration: "45 minutes",
              startTime: "07:00",
              endTime: "20:00",
            },
          ],
          relaxationLounges: [
            {
              typeName: "Stress Reduction Workshop",
              description:
                "Group workshop teaching various stress management techniques",
              price: 75,
              duration: "3 hours",
              startTime: "14:00",
              endTime: "17:00",
            },
          ],
          sleepPrograms: [
            {
              typeName: "Sleep Enhancement Package",
              description: "Comprehensive program to improve sleep quality",
              price: 200,
              duration: "1 week",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          wellnessRetreats: [
            {
              typeName: "Weekend Wellness Retreat",
              description:
                "Immersive wellness experience including various treatments and activities",
              price: 600,
              duration: "2 days",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          healthAndWellnessSeminars: [
            {
              typeName: "Health and Wellness Educational Seminars",
              description:
                "Informative seminars on various health and wellness topics",
              price: 50,
              duration: "90 minutes",
              startTime: "08:00",
              endTime: "16:00",
            },
          ],
          chiropracticServices: [
            {
              typeName: "Chiropractic Assessment and Treatment",
              description:
                "Initial consultation and treatment with a licensed chiropractor",
              price: 120,
              duration: "60 minutes",
              startTime: "09:00",
              endTime: "17:00",
            },
          ],
          physicalTherapy: [
            {
              typeName: "Physical Therapy Evaluation and Treatment",
              description:
                "One-on-one session with a licensed physical therapist",
              price: 110,
              duration: "60 minutes",
              startTime: "08:00",
              endTime: "18:00",
            },
          ],
          craniosacralTherapy: [
            {
              typeName: "Craniosacral Therapy Session",
              description:
                "Gentle bodywork focusing on the craniosacral system",
              price: 95,
              duration: "60 minutes",
              startTime: "10:00",
              endTime: "18:00",
            },
          ],
          waterAerobics: [
            {
              typeName: "Group Water Aerobics",
              description: "Low-impact fitness class conducted in the pool",
              price: 25,
              duration: "45 minutes",
              startTime: "09:00",
              endTime: "11:00",
            },
          ],
          saunasAndSteamRooms: [
            {
              typeName: "Private Sauna Experience",
              description: "Relaxing session in a private sauna",
              price: 30,
              duration: "30 minutes",
              startTime: "07:00",
              endTime: "21:00",
            },
          ],
        },
        transportation: {
          "Airport Shuttle": [
            {
              typeName: "Airport Shuttle Service",
              description: "Convenient transportation to and from the airport",
              price: 25,
              duration: "Varies based on airport distance",
              airportList: ["LXY", "NDL", "MBY"],
              bookingPolicy:
                "Reservation required at least 24 hours in advance",
            },
          ],
          "Local Area Shuttle": [
            {
              typeName: "Local Attraction Shuttle",
              description:
                "Transportation to popular local attractions and shopping areas",
              price: 15,
              duration: "Varies based on destination",
              bookingPolicy: "Departures every hour from 9:00 AM to 5:00 PM",
            },
          ],
          "Luxury Car Rental": [
            {
              typeName: "Premium Car Rental Service",
              description: "High-end car rentals for guests",
              price: 150,
              duration: "24-hour rental period",
              bookingPolicy: "Valid driver's license and credit card required",
            },
          ],
          "Bicycle Rental": [
            {
              typeName: "Hotel Bicycle Rental",
              description: "Rent bicycles for exploring the local area",
              price: 20,
              duration: "Up to 8 hours",
              includedItems: "Helmet, lock, and city map",
              bookingPolicy: "Waiver must be signed before rental",
            },
          ],
        },
        personalshopping: {
          "Personal Shopping": [
            {
              typeName: "Personal Shopping",
              description: "smooth ride towards airport",
              keyBenefits:
                "Convenience: Leave the planning and logistics to us while you enjoy a stress-free shopping day.",
              timeline:
                "8:00 AM - 9:00 AM: Start your day with a gourmet breakfast at the hotel, meeting your personal shopper to discuss your preferences",
              pricingPerPerson: "Standard Package: 50 per person",
              bookingAndCancellationPolicy:
                "Cancellation: Cancellations made within 24 hours of the scheduled service will incur a 50% cancellation fee. No-shows will be charged the full price",
              testimonials:
                "An unforgettable shopping experience! The personal shopper knew exactly what I was looking for and took me to the best places in town.",
            },
          ],
        },
        laundry: {
          "Laundry Service": [
            {
              typeName: "Washing & Drying",
              description:
                "Professional washing and drying service for your clothes",
              price: 15,
              minTime: "2 hours",
            },
          ],
          "Dry Cleaning": [
            {
              typeName: "Dry Cleaning",
              description:
                "Expert dry cleaning for delicate fabrics and formal wear",
              price: 25,
              minTime: "24 hours",
            },
          ],
          "Pressing Service": [
            {
              typeName: "Ironing Service",
              description:
                "Get your clothes professionally pressed and wrinkle-free",
              price: 10,
              minTime: "1 hour",
            },
          ],
          "Stain Removal": [
            {
              typeName: "Specialized Stain Treatment",
              description: "Advanced stain removal for tough spots and spills",
              price: 20,
              minTime: "3 hours",
            },
          ],
          "ShoeShine Service": [
            {
              typeName: "Shoe Shine Service",
              description:
                "Professional shoe polishing to keep your footwear looking sharp",
              price: 12,
              minTime: "30 minutes",
            },
          ],
        },
        tours: {
          "City Tour": [
            {
              typeName: "City Tour",
              description: "smooth ride towards airport",
              keyBenefits:
                "Convenience: Leave the planning and logistics to us while you enjoy a stress-free shopping day.",
              timeline:
                "8:00 AM - 9:00 AM: Start your day with a gourmet breakfast at the hotel, meeting your personal shopper to discuss your preferences",
              duration: "3 hours",
              pricingPerPerson: "Standard Package: 50 per person",
              bookingAndCancellationPolicy:
                "Cancellation: Cancellations made within 24 hours of the scheduled service will incur a 50% cancellation fee. No-shows will be charged the full price",
              testimonials:
                "An unforgettable shopping experience! The personal shopper knew exactly what I was looking for and took me to the best places in town.",
            },
          ],
          "Food and Wine Tour": [
            {
              typeName: "Local Culinary Experience Tour",
              description: "Guided tour of local cuisine and wine tasting",
              pricingPerPerson: 85,
              duration: "3 hours",
              keyBenefits:
                "Taste local specialties, wine pairing, culinary history and culture insights",
              timeline: "Tuesday, Thursday, and Saturday at 6:00 PM",
              bookingAndCancellationPolicy:
                "Cancellation: Cancellations made within 24 hours of the scheduled service will incur a 50% cancellation fee. No-shows will be charged the full price",
              testimonials:
                "An unforgettable shopping experience! The personal shopper knew exactly what I was looking for and took me to the best places in town.",
            },
          ],
        },
      },
    },
    customers: {
      "+918897562548": {
        bookingDetails: {
          customer: {
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "+1234567890",
            reviews: ["Excellent stay, friendly staff"],
          },
          roomType: "Deluxe",
          aggregator: "makeMyTrip",
          aggregatorLogo:
            "https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg",
          bookingDate: "2024-09-21T15:47:00.000Z",
          checkIn: "2024-09-25T04:47:00.000Z",
          checkOut: "2024-09-26T04:47:00.000Z",
          noOfGuests: "2",
          noOfRoom: "1",
          inclusions: "taxes, wifi, breakfast",
          specialRequirements: "Late check-out requested",
          bookingId: "BO:123",
          attendant: "Mishra",
          status: "Checked Out",
          timeOfRequest: "",
          timeOfFullfilment: "",
          payment: {
            mode: "credit card",
            paymentId: "BOO24092001",
            price: "750",
            priceAfterDiscount: "675",
            timeOfTransaction: "2024-10-02T07:00:00.000Z",
            paymentStatus: "complete",
            gst: {
              gstAmount: "100",
              gstPercentage: "18%",
              cgstAmount: "50",
              cgstPercentage: "9%",
              sgstAmount: "50",
              sgstPercentage: "9%",
            },
            discount: {
              type: "percentage",
              amount: "10",
              code: "SUMMER10",
            },
          },
        },
        servicesUsed: {
          massage: {
            serviceId: "SE:123",
            status: "open",
            serviceName: "Swedish Massage",
            type: "massage",
            requestTime: "2024-09-25T08:47:00.000Z",
            startTime: "2024-09-25T11:47:00.000Z",
            endTime: "2024-09-25T12:47:00.000Z",
            price: "80",
            attendant: "Sarah Johnson",
            payment: {
              transctionId: "XUSie83",
              paymentStatus: "on checkout",
              mode: "room charge",
              paymentId: "SPA24092101",
              timeOfTransaction: "2024-10-02T07:00:00.000Z",
              price: 80,
              priceAfterDiscount: "72",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "percentage",
                amount: "10",
                code: "SPAWEEKEND",
              },
            },
          },
        },
        diningDetails: {
          orders: [
            {
              specialRequirement: "Make pina collada extra sour",
              items: [
                {
                  itemName: "Club Sandwich",
                  portionSize: "Regular",
                  price: 15,
                },
                {
                  itemName: "Caesar Salad",
                  portionSize: "Large",
                  price: 12,
                },
              ],
              orderId: "OR:RO24",
              status: "completed",
              timeOfRequest: "2024-10-03T10:10:00.000Z",
              timeOfFullfilment: "2024-10-03T10:25:00.000Z",
              payment: {
                transctionId: "XUSie83",
                paymentStatus: "pending",
                mode: "room charge",
                paymentId: "RO24092101",
                price: "27",
                priceAfterDiscount: "27",
                timeOfTransaction: "2024-10-02T07:00:00.000Z",
                gst: {
                  gstAmount: "100",
                  gstPercentage: "18%",
                  cgstAmount: "50",
                  cgstPercentage: "9%",
                  sgstAmount: "50",
                  sgstPercentage: "9%",
                },
                discount: {
                  type: "none",
                  amount: 0,
                  code: "",
                },
              },
            },
          ],
        },
        issuesReported: {
          maintenance: {
            issueId: "IS:123",
            status: "Completed",
            category: "maintenance",
            name: "Leaky Faucet",
            description: "Bathroom sink faucet is dripping",
            reportTime: "2024-09-21T20:30:00Z",
            resolutionTime: "2024-09-22T09:15:00Z",
            attendant: "Robert Lee",
          },
        },
        transctions: [
          {
            location: "104",
            against: "SE:7889",
            attendant: "Mishra",
            bookingId: "BO:123",
            payment: {
              paymentStatus: "complete",
              mode: "online",
              paymentId: "TXN123456",
              timeOfTransaction: "2024-09-29T10:00:00.000Z",
              price: "30",
              priceAfterDiscount: "27",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "coupon",
                amount: 3,
                code: "SAVE10",
              },
            },
          },
        ],
      },
    },
    issues: {
      Cleanliness: [
        "General Cleanliness",
        "Bathroom",
        "Bedding",
        "Floors and Carpets",
      ],
      Functionality: [
        "Electrical Outlets",
        "Lighting",
        "Heating/Cooling",
        "Plumbing",
      ],
      SafetyandSecurity: ["Locks", "Smoke Detectors", "Fire Exits"],
      Amenities: ["Wi-Fi", "Television", "Mini-bar", "Coffee Maker"],
      Aesthetics: [
        "Decor and Furnishings",
        "Paint and Wallpaper",
        "Windows and Curtains",
      ],
      Noise: ["External Noise", "Internal Noise"],
      Service: ["Room Service", "Housekeeping", "Front Desk"],
      Miscellaneous: ["Odors", "Insects or Pests", "Personal Items"],
    },
    menu: {
      categories: [
        {
          id: "1",
          name: "Recommended",
          categoryLogo:
            "https://as2.ftcdn.net/v2/jpg/01/08/12/21/1000_F_108122163_qaG575WWTO5TVVEfa5qnxxJ26lohn7KU.jpg",

          position: "0",
          menuItems: [
            {
              id: "1",
              name: "Xiao Long Bao",
              position: 1,
              description:
                "Chinese soup dumplings filled with seasoned chicken",
              images: [
                "https://hips.hearstapps.com/hmg-prod/images/delish-202210-soupdumplings-205-2-1665605391.jpg?crop=1xw:1xh;center,top&resize=1200:*",
                "https://therecipecritic.com/wp-content/uploads/2023/02/soup_dumplings-1-667x1000.jpg",
                "https://hips.hearstapps.com/hmg-prod/images/delish-202210-soupdumplings-223-1665605397.jpg?crop=0.536xw:1.00xh;0.354xw,0&resize=980:*",
              ],
              portion: "Single",
              price: { Single: "499" },
              cuisineName: "Chinese",
              categoryName: "Dumplings",
              nature: "Non-Veg",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
            {
              id: "2",
              name: "Mutton Seekh Kebab",
              position: 1,
              description:
                "Mutton Seekh Kebabs are a perfect snack or appetizers for parties, get-togethers or Sunday brunches",
              images: [
                "https://www.licious.in/blog/wp-content/uploads/2020/12/Mutton-Seekh-Kebab.jpg",
                "https://foodiesterminal.com/wp-content/uploads/2019/04/Mutton-seekh-kabab-recipe-2.jpg",
                "https://foodiesterminal.com/wp-content/uploads/2019/04/Mutton-seekh-kabab-recipe-8.jpg",
              ],
              portion: "Half/Full",
              price: {
                Half: "150.00",
                Full: "250.00",
              },
              cuisineName: "Indian",
              categoryName: "kabab",
              nature: "Non-Veg",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "2",
          name: "Appeteasers",
          categoryLogo:
            "https://thewoksoflife.com/wp-content/uploads/2022/12/air-fryer-hot-wings-19-650x931.jpg",

          menuItems: [
            {
              id: "6578",
              name: "Chicken Wings",
              description: "Tender, Spicy and Juicy. Original or Peri-Crusted",
              images: [
                "https://thewoksoflife.com/wp-content/uploads/2022/12/air-fryer-hot-wings-19-650x931.jpg",
                "https://thewoksoflife.com/wp-content/uploads/2022/12/air-fryer-hot-wings-8-650x918.jpg",
                "https://thewoksoflife.com/wp-content/uploads/2022/12/air-fryer-hot-wings-24-650x919.jpg",
              ],
              portion: "Half/Full",
              price: {
                Half: "250.00",
                Full: "450.00",
              },
              nature: "Non-Veg",
              cuisineName: "Indian",
              categoryName: "Appeteasers",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "3",
          name: "Peri-peri chicken",
          categoryLogo:
            "https://www.chilipeppermadness.com/wp-content/uploads/2018/09/Peri-Peri-Chicken-Legs-Recipe2.jpg",

          menuItems: [
            {
              id: "94349",
              name: "1/4 Chicken",
              description:
                "Quarter Chicken Marinated with PERi-PERi Sauce and Grilled",
              images: [
                "https://www.chilipeppermadness.com/wp-content/uploads/2018/09/Peri-Peri-Chicken-Legs-Recipe1.jpg",
                "https://www.chilipeppermadness.com/wp-content/uploads/2018/09/Peri-Peri-Chicken-Legs-Recipe2.jpg",
                "https://www.chilipeppermadness.com/wp-content/uploads/2019/03/Peri-Peri-Sauce-Recipe1.jpg",
              ],
              portion: "Half/Full",
              price: {
                Half: "385.00",
                Full: "750.00",
              },
              nature: "Non-Veg",
              cuisineName: "Indian",
              categoryName: "Peri-peri chicken",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "4",
          name: "Dessert",
          categoryLogo:
            "https://sugarspunrun.com/wp-content/uploads/2023/08/Salted-caramel-cheesecake-3-of-11.jpg",

          menuItems: [
            {
              id: "94399",
              name: "Dessert",

              description:
                "It has caramel swirled inside and on top, plus plenty of flaky sea salt",
              images: [
                "https://sugarspunrun.com/wp-content/uploads/2023/08/Salted-caramel-cheesecake-3-of-11.jpg",
                "https://sugarspunrun.com/wp-content/uploads/2023/08/Salted-caramel-cheesecake-9-of-11.jpg",
                "https://sugarspunrun.com/wp-content/uploads/2023/08/Salted-caramel-cheesecake-7-of-11.jpg",
              ],

              portion: "Single",
              price: { Single: "230" },
              nature: "Veg",
              cuisineName: "Desserts",
              categoryName: "Dessert",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "5",
          name: "Salads",
          categoryLogo:
            "https://www.healthnutnutrition.ca/wp-content/uploads/2019/11/IMG_8081-700x1050.jpg",

          menuItems: [
            {
              id: "94340",
              name: "Portuguese Salad",

              description:
                "Fresh Tomato, Nando Peri-Olives, Mixed Peppers, Cucumber and Onion on A Bed of Crisp Lettuce",
              images: [
                "https://www.healthnutnutrition.ca/wp-content/uploads/2019/11/IMG_8081-700x1050.jpg",
                "https://www.healthnutnutrition.ca/wp-content/uploads/2019/11/IMG_8089-700x1050.jpg",
                "https://www.healthnutnutrition.ca/wp-content/uploads/2019/11/IMG_8092-700x1050.jpg",
              ],
              portion: "Half/Full",
              price: {
                Half: "145.00",
                Full: "250.00",
              },
              nature: "Veg",
              cuisineName: "Salad",
              categoryName: "Salads",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "6",
          name: "Middle-East",
          categoryLogo:
            "https://i0.wp.com/www.onceuponachef.com/images/2012/07/Hummus.jpg?resize=1120%2C1449&ssl=1",

          menuItems: [
            {
              id: "2",
              name: "Hummus with PERI-PERI Drizzle",

              description:
                "Pour Smoky PERi-PERi Oil Over Creamy Hummus and Dig in with Strips Of Warm Pita",
              images: [
                "https://i0.wp.com/www.onceuponachef.com/images/2012/07/Hummus.jpg?resize=1120%2C1449&ssl=1",
                "https://i0.wp.com/www.onceuponachef.com/images/2012/07/Hummus-2.jpg?w=1000&ssl=1",
                "https://i0.wp.com/www.onceuponachef.com/images/2012/07/Hummus-4.jpg?w=1000&ssl=1",
              ],
              portion: "Half/Full",
              price: {
                Half: "215.00",
                Full: "350.00",
              },
              nature: "Veg",
              cuisineName: "Indian",
              categoryName: "Appeteasers",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "7",
          name: "Italian",
          categoryLogo:
            "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg",

          menuItems: [
            {
              id: "94376",
              name: "CheeseKing Pizza",

              description:
                "Best garlic pizza uses both parmesan and mozzarella, and infuses olive oil with garlic",
              images: [
                "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg",
                "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza-2_8.jpg",
                "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza-2_7.jpg",
              ],
              portion: "Regular/Large",
              price: {
                Regular: "385.00",
                Large: "750.00",
              },
              nature: "Veg",
              cuisineName: "Italian",
              categoryName: "Italian",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "8",
          name: "Burgers",
          categoryLogo:
            "https://tastesbetterfromscratch.com/wp-content/uploads/2019/07/Grilled-Chicken-Burgers-2.jpg",

          menuItems: [
            {
              id: "94391",
              name: "Chicken Breast Burger",

              description:
                "Served on A Toasted Portuguese Roll with Fresh Rocket, Tomato, Pickled Red Onions and Perinaise",
              images: [
                "https://tastesbetterfromscratch.com/wp-content/uploads/2019/07/Grilled-Chicken-Burgers-2.jpg",
                "https://tastesbetterfromscratch.com/wp-content/uploads/2019/07/Grilled-Chicken-Burgers-1.jpg",
                "https://tastesbetterfromscratch.com/wp-content/uploads/2019/07/Grilled-Chicken-Burgers-3.jpg",
              ],
              portion: "Single",
              price: { Single: "335" },
              nature: "Non-Veg",
              cuisineName: "Burger",
              categoryName: "Burgers, pitas, wraps",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "9",
          name: "Pita",
          categoryLogo:
            "https://thesavvyspoon.com/wp-content/uploads/2020/06/IMG_1336.jpg",

          menuItems: [
            {
              id: "94397",
              name: "Chicken Pita",

              description:
                "Served in A Lightly Toasted Pita, Stuffed With Chicken Tenders, Crisp Veggie Salad and Creamy Whip",
              images: [
                "https://thesavvyspoon.com/wp-content/uploads/2020/06/IMG_1336.jpg",
                "https://thesavvyspoon.com/wp-content/uploads/2020/06/IMG_1325-1892x2048.jpg",
                "https://thesavvyspoon.com/wp-content/uploads/2020/06/IMG_1339.jpg",
              ],
              portion: "Single",
              price: { Single: "335" },
              nature: "Non-Veg",
              cuisineName: "Indian",
              categoryName: "Burgers, pitas, wraps",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "10",
          name: "Wraps",
          categoryLogo:
            "https://www.simplejoy.com/wp-content/uploads/2020/07/Chicken-wrap-735x1103.webp",

          menuItems: [
            {
              id: "94388",
              name: "Chicken Wrap",

              description:
                "A Lightly Toasted Wrap, Generously Filled With Tender Chicken, Chili Jam, Green Leaf Lettuce and Tangy Yoghurt Sauce",
              images: [
                "https://www.simplejoy.com/wp-content/uploads/2020/07/Chicken-wrap-735x1103.webp",
                "https://www.simplejoy.com/wp-content/uploads/2020/07/how-to-make-a-chicken-wrap-1536x1024.jpg",
                "https://www.simplejoy.com/wp-content/uploads/2020/07/grilled-chicken-wrap-768x1152.webp",
              ],
              portion: "Single",
              price: { Single: "335" },
              nature: "Non-Veg",
              cuisineName: "Indian",
              categoryName: "Wraps",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
        {
          id: "11",
          name: "Drinks",
          categoryLogo:
            "https://mindfulmocktail.com/wp-content/uploads/2021/02/mango-mocktail-recipe-1.jpg",

          menuItems: [
            {
              id: "94388",
              name: "Spicy Mango Mocktail",

              description:
                "Mango Mocktail is a drink that can be enjoyed by everyone alike. Made with mango juice, coconut water, ginger and fresh mint the drink gets the kick from jalapeños",
              images: [
                "https://www.cookwithmanali.com/wp-content/uploads/2013/10/Spicy-Mango-Mocktail-768x1164.jpg",
                "https://www.cookwithmanali.com/wp-content/uploads/2013/10/Mint-Mango-Mocktail-768x1164.jpg",
                "https://mindfulmocktail.com/wp-content/uploads/2021/02/mango-mocktail-recipe-1.jpg",
              ],
              portion: "Medium/Large",
              price: {
                Medium: "385.00",
                Large: "750.00",
              },
              nature: "Non-Veg",
              cuisineName: "Indian",
              categoryName: "Drinks",
              discountType: "",
              discountAmount: "",
              tags: [],
            },
          ],
        },
      ],
    },
    reviews: {
      "Google Maps": {
        reviewText: "Wonderful stay, great service!",
        rating: 5,
        reviewerName: "Jane Smith",
        date: "2024-09-23T16:45:00Z",
        nature: "positive",
      },
    },
    live: {
      rooms: [
        {
          bookingDetails: {
            customer: {
              name: "vipin",
              email: "tanejavipin@gmail.com",
              phone: "+918897562548",
              address: "26 lokhand wala circle, parel mumbai",
            },
            location: "101",
            roomType: "deluxe",
            aggregator: "makeMyTrip",
            aggregatorLogo:
              "https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg",
            bookingId: "RO:8966",
            status: "reserved",
            attendant: "Shyam Mishra",
            bookingDate: "2024-09-29T10:00:00.000Z",
            checkIn: "2024-09-30T07:00:00.000Z",
            checkOut: "2024-10-02T07:00:00.000Z",
            noOfGuests: "2",
            noOfRoom: "1",
            inclusions: "taxes, wifi, breakfast",
            specialRequirements: "Late check-out requested",
            payment: {
              paymentStatus: "complete",
              mode: "online",
              paymentId: "TXN123456",
              timeOfTransaction: "2024-09-29T10:00:00.000Z",
              price: "30",
              priceAfterDiscount: "27",
              gst: {
                gstAmount: "100",
                gstPercentage: "18%",
                cgstAmount: "50",
                cgstPercentage: "9%",
                sgstAmount: "50",
                sgstPercentage: "9%",
              },
              discount: {
                type: "coupon",
                amount: 3,
                code: "SAVE10",
              },
            },
          },
          diningDetails: {
            orders: [
              {
                orderId: "OR:123",
                items: [
                  {
                    itemId: "gac1",
                    itemName: "Pizza",
                    portionSize: "Large",
                    price: 20,
                  },
                  {
                    itemId: "mac1",
                    itemName: "Salad",
                    portionSize: "Small",
                    price: 10,
                  },
                ],
                attendant: "Alice Smith",
                status: "open",
                timeOfRequest: "2024-10-03T10:10:00.000Z",
                timeOfFullfilment: "2024-10-03T10:25:00.000Z",
                payment: {
                  transctionId: "XUSie83",
                  paymentStatus: "pending",
                  mode: "room charge",
                  paymentId: "RO24092101",
                  price: "27",
                  priceAfterDiscount: "27",
                  timeOfTransaction: "2024-10-02T07:00:00.000Z",
                  gst: {
                    gstAmount: "100",
                    gstPercentage: "18%",
                    cgstAmount: "50",
                    cgstPercentage: "9%",
                    sgstAmount: "50",
                    sgstPercentage: "9%",
                  },
                  discount: {
                    type: "none",
                    amount: 0,
                    code: "",
                  },
                },
              },
            ],
          },
          servicesUsed: {
            massage: {
              serviceId: "SE:123",
              serviceName: "Massage",
              type: "massage",
              requestTime: "2024-09-25T08:47:00.000Z",
              startTime: "2024-09-25T11:47:00.000Z",
              endTime: "2024-09-25T12:47:00.000Z",
              price: 50,
              attendant: "Bob Johnson",
              status: "competed",
              payment: {
                transctionId: "XUSie83",
                paymentStatus: "on checkout",
                mode: "room charge",
                paymentId: "SPA24092101",
                timeOfTransaction: "2024-10-02T07:00:00.000Z",
                price: "80",
                priceAfterDiscount: "72",
                gst: {
                  gstAmount: "100",
                  gstPercentage: "18%",
                  cgstAmount: "50",
                  cgstPercentage: "9%",
                  sgstAmount: "50",
                  sgstPercentage: "9%",
                },
                discount: {
                  type: "percentage",
                  amount: 10,
                  code: "SPAWEEKEND",
                },
              },
            },
          },
          issuesReported: {
            maintenance: {
              issueId: "IS:123",
              category: "maintenance",
              name: "Leaking faucet",
              description: "Faucet in the bathroom is leaking.",
              reportTime: "2024-09-21T18:00:00Z",
              status: "Assigned",
              attendant: "Charlie Brown",
              resolutionTime: null,
            },
          },
          transctions: [
            {
              location: "104",
              against: "SE:7889",
              attendant: "Mishra",
              bookingId: "BO:123",
              payment: {
                paymentStatus: "complete",
                mode: "online",
                paymentId: "TXN123456",
                timeOfTransaction: "2024-09-29T10:00:00.000Z",
                price: "30",
                priceAfterDiscount: "27",
                gst: {
                  gstAmount: "100",
                  gstPercentage: "18%",
                  cgstAmount: "50",
                  cgstPercentage: "9%",
                  sgstAmount: "50",
                  sgstPercentage: "9%",
                },
                discount: {
                  type: "coupon",
                  amount: 3,
                  code: "SAVE10",
                },
              },
            },
          ],
        },
      ],
      roomsData: {
        stats: {
          available: 0,
          booking: 0,
          "in preparation": 0,
          reserved: 0,
        },
        status: {
          room: [
            "Available",
            "Booked",
            "Occupied",
            "Cleaning",
            "Checked Out",
            "Upgraded",
            "Paid",
          ],
          dining: [
            "Ordering",
            "Order placed",
            "Served",
            "Billed",
            "Pending",
            "Cancelled",
            "Paid",
          ],
          service: ["Requested", "Accepted", "Denied", "Billed", "Pending"],
          issue: ["Opened", "Assigned", "Fixing required", "Fixed"],
        },
        roomDetail: [
          {
            roomNo: "101",
            status: "available",
            roomType: "super deluxe",
            cleaning: {
              lastCleaned: "2024-10-02T07:00:00.000Z",
              cleanedBy: "santosh mishra",
              startTime: "2024-10-02T07:00:00.000Z",
              endTime: "2024-10-02T07:10:00.000Z",
            },
            maintenance: {
              issue: "tile came out",
              description: "a tile from the bathroom floor came out",
              startTime: "2024-10-02T07:00:00.000Z",
              endTime: "2024-10-02T10:10:00.000Z",
              fixedBy: "neeraj chauhan",
            },
          },
        ],
      },
    },
  };
  let usr;
  const handleUser = async () => {
    // const user = await registerUser("surajnimeshh1000@gmail.com", hotelData);
    const hashedPassword = await hash("123456789", 8);
    console.log(hashedPassword);
  };

  return (
    <div>
      <h1>{JSON.stringify(usr)}</h1>
      <button onClick={() => handleUser()}>Click</button>
    </div>
  );
}
