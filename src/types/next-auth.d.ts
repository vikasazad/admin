import "next-auth";

declare module "next-auth" {
  //   interface User {
  //     id?: string;
  //     isverified?: boolean;
  //     role?: string;
  //     canForgotPassword: boolean;
  //     staff: [
  //       {
  //         email?: string;
  //         password?: string;
  //         role?: string;
  //         canForgotPassword?: boolean;
  //       }
  //     ];
  //   }

  interface User {
    newUser?: boolean;
    id?: string;
    password?: string;
    image?: string;
    countryCode?: string;
    phone?: string;
    businessName?: string;
    businessType?: string;
    role?: string;
    isverified?: string;
    canForgotPassword?: boolean;
    formattedNumber?: string;
    staff: [
      {
        email?: string;
        password?: string;
        role?: string;
        canForgotPassword?: boolean;
      }
    ];
  }
  interface Session {
    user: {
      id?: string;
      password?: string;
      image?: string;
      countryCode?: string;
      phone?: string;
      businessName?: string;
      businessType?: string;
      role?: string;
      isverified?: string;
      canForgotPassword?: boolean;
      formattedNumber?: string;
      newUser?: boolean;
      staff: [
        {
          email?: string;
          password?: string;
          role?: string;
          canForgotPassword?: boolean;
        }
      ];
    };
  }
}
