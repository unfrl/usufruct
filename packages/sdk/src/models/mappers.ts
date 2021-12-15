import * as coreHttp from "@azure/core-http";

export const Category: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Category",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      created: {
        serializedName: "created",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      updated: {
        serializedName: "updated",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Item: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Item",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      created: {
        serializedName: "created",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      updated: {
        serializedName: "updated",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      categories: {
        serializedName: "categories",
        required: true,
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Category"
            }
          }
        }
      },
      labels: {
        serializedName: "labels",
        required: true,
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Label"
            }
          }
        }
      }
    }
  }
};

export const Label: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Label",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      created: {
        serializedName: "created",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      updated: {
        serializedName: "updated",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpsertItemDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpsertItemDto",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      categoryNames: {
        serializedName: "categoryNames",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      labelNames: {
        serializedName: "labelNames",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const ItemAttribute: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ItemAttribute",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      created: {
        serializedName: "created",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      updated: {
        serializedName: "updated",
        required: true,
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      dataType: {
        serializedName: "dataType",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

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

export const UserDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UserDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      email: {
        serializedName: "email",
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
