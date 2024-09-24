
export const getInputStates = () => {
    const inputStates ={
        firstName: {
          type: "text",
          placeHolder: "First Name",
          id: "firstName",
          error: "",
          isSignInInput: false,
        },
        lastName: {
          type: "text",
          placeHolder: "Last Name",
          id: "lastName",
          error: "",
          isSignInInput: false,
        },
        userId: {
          type: "text",
          placeHolder: "User Id",
          id: "userId",
          error: "",
          isSignInInput: false,
        },
        email: {
          type: "email",
          placeHolder: "Email",
          id: "email",
          error: "",
          isSignInInput: true,
        },
        password: {
          type: "password",
          placeHolder: "Password",
          id: "password",
          error: "",
          isSignInInput: true,
        },
      };

      return inputStates;
}