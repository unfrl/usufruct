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
      shortId: {
        serializedName: "shortId",
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
      },
      customFields: {
        serializedName: "customFields",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "CustomFieldDto"
            }
          }
        }
      }
    }
  }
};

export const CustomFieldDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CustomFieldDto",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        required: true,
        type: {
          name: "String"
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

export const Library: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Library",
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
      slug: {
        serializedName: "slug",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const UpsertLibraryDto: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpsertLibraryDto",
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
      }
    }
  }
};

export const LibraryMember: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LibraryMember",
    modelProperties: {
      libraryId: {
        serializedName: "libraryId",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      userId: {
        serializedName: "userId",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      role: {
        serializedName: "role",
        required: true,
        readOnly: true,
        type: {
          name: "String"
        }
      },
      library: {
        serializedName: "library",
        type: {
          name: "Composite",
          className: "Library"
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
      }
    }
  }
};

export const LibraryMemberLibrary: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LibraryMemberLibrary",
    modelProperties: {
      ...Library.type.modelProperties
    }
  }
};
