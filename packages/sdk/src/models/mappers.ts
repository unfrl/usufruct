import * as coreHttp from "@azure/core-http";

export const SignUpDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SignUpDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      password: {
        serializedName: "password",
        required: true,
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SignInDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SignInDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      password: {
        serializedName: "password",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AuthDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AuthDto",
    modelProperties: {
      accessToken: {
        serializedName: "accessToken",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const VerificationDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "VerificationDto",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
