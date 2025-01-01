beforeEach(() => {
    cy.visit("https://reqres.in/");
  })


  it("GET List users using request Test", () => {
    cy.intercept('GET', '/api/users?page=2', {
      statusCode: 200,
      body: {
        "page": 2,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
          {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
          },
          {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
          },
          {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
          },
          {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://reqres.in/img/faces/10-image.jpg"
          },
          {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://reqres.in/img/faces/11-image.jpg"
          },
          {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://reqres.in/img/faces/12-image.jpg"
          }
        ],
        "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      }
    }).as('getListOfUsers');

    cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.data.length).to.eq(6);
      expect(response.body.data[0]).to.deep.equal({
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg"
      });

      expect(response.body.data[3]).to.deep.equal({
            id: 10,
            email: "byron.fields@reqres.in",
            first_name: "Byron",
            last_name: "Fields",
            avatar: "https://reqres.in/img/faces/10-image.jpg"
      });
      
      expect(response.body.support.url).to.eq("https://reqres.in/#support-heading");
      expect(response.body.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
    });
   
  })

  it("GET List users using intercept Test", () => {
  cy.intercept('GET', '/api/users?page=2', {
    statusCode: 200,
    body: {
      "page": 2,
      "per_page": 6,
      "total": 12,
      "total_pages": 2,
      "data": [
        {
          "id": 7,
          "email": "michael.lawson@reqres.in",
          "first_name": "Michael",
          "last_name": "Lawson",
          "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
          "id": 8,
          "email": "lindsay.ferguson@reqres.in",
          "first_name": "Lindsay",
          "last_name": "Ferguson",
          "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
          "id": 9,
          "email": "tobias.funke@reqres.in",
          "first_name": "Tobias",
          "last_name": "Funke",
          "avatar": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
          "id": 10,
          "email": "byron.fields@reqres.in",
          "first_name": "Byron",
          "last_name": "Fields",
          "avatar": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
          "id": 11,
          "email": "george.edwards@reqres.in",
          "first_name": "George",
          "last_name": "Edwards",
          "avatar": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
          "id": 12,
          "email": "rachel.howell@reqres.in",
          "first_name": "Rachel",
          "last_name": "Howell",
          "avatar": "https://reqres.in/img/faces/12-image.jpg"
        }
      ],
      "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
      }
    }
  }).as('getListOfUsers');
  
  // Vizitează pagina pentru a declanșa cererea
  cy.visit('https://reqres.in/');

  cy.wait('@getListOfUsers').then((interception) => {
      if (interception.response) {
    const response = interception.response.body;
    
    // Verificăm datele interceptate
    expect(response.data.length).to.eq(6);
    expect(response.data[0]).to.deep.equal({
      id: 7,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg"
    });

    expect(response.data[3]).to.deep.equal({
      id: 10,
      email: "byron.fields@reqres.in",
      first_name: "Byron",
      last_name: "Fields",
      avatar: "https://reqres.in/img/faces/10-image.jpg"
    });

    expect(response.support.url).to.eq("https://reqres.in/#support-heading");
    expect(response.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
  }
  });
  })

  it("GET Single User Test", () => {
    cy.intercept('GET', '/api/users/2', {
      statusCode: 200,
      body: {
        "data": {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      }
    }).as('getUser');

    cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.include({
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg"
      });
  
      expect(response.body.support.url).to.eq("https://reqres.in/#support-heading");
      expect(response.body.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
    });
  })

  // it('Get User Test0', ()=>{
  //   cy.request({
  //     method: 'GET',
  //     url: 'https://reqres.in/api/users/2'
  //   }).then((res) => {
  //     expect(res.status).to.eq(200);
  //     expect(res.body.data).to.include({
  //       id: 2,
  //       email: "janet.weaver@reqres.in",
  //       first_name: "Janet",
  //       last_name: "Weaver",
  //       avatar: "https://reqres.in/img/faces/2-image.jpg"
  //     })
  //   })
  // })


  it("GET One User using interception Test", () => {
    // Intercepting GET request to /api/users/2
    cy.intercept({
      method: 'GET',
      url: '/api/users/2'
    }).as('getSingleUser'); // Alias for the request

    // Visit the main page 
    cy.visit('https://reqres.in/');

    //SAU
    cy.get('li[data-id="users-single"] a').click(); // Select the <a> element and click

    // Wait for the intercepted request and then validate the response
    cy.wait('@getSingleUser').then((interception) => {
      // Check if the response is not undefined
      if (interception.response) {
        const responseBody = interception.response.body;

        // Assert the status code
        expect(interception.response.statusCode).to.eq(200);

        // Assert the user data
        expect(responseBody.data).to.include({
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg"
        });

        // Assert the support information
        expect(responseBody.support).to.include({
          url: "https://reqres.in/#support-heading",
          text: "To keep ReqRes free, contributions towards server costs are appreciated!"
        });
      }
    });
  });


  it("GET Single User Not Found using Request Test", () => {
    cy.intercept('GET','/api/users/23',{
        statusCode: 404,
        body: {
        }
    }).as('getUserNotFound');

    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  })

  it("GET Single User Not Found using Interception Test", () => {
    cy.intercept('GET','/api/users/23',{
        statusCode: 404,
        body: {
        }
    }).as('getUserNotFound');

    cy.visit('https://reqres.in/');
    cy.get('li[data-id="users-single-not-found"] a').click();
    cy.wait('@getUserNotFound').then((interception) => {
      if (interception.response) {
        const responseBody = interception.response.body;
        // Assert the status code
        expect(interception.response.statusCode).to.eq(404);
        // Assert the user data to be empty
        expect(responseBody).to.be.empty;
      }
    })
  })
////changed status code
  it("GET Single User Not Found (404) with changed response (200)", () => {
    // Intercepting GET request to /api/users/23
    cy.intercept({
      method: 'GET',
      url: '/api/users/23'

    },
    [
    {
      statusCode: 200, // Force the response status code to be 200
      body: {} 
    }
    ]
 
  ).as('getUserNotFound'); 

    cy.visit('https://reqres.in/');
    cy.get('li[data-id="users-single-not-found"] a').click(); 

    cy.wait('@getUserNotFound').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(404);
        expect(interception.response.body).to.be.empty;
      }
    });
  })

  it("GET Single Resource using Request Test", () => {
    cy.intercept('GET', '/api/unknown/2', {
      statusCode: 200,
      body: {
        "data": {
          "id": 2,
          "name": "fuchsia rose",
          "year": 2001,
          "color": "#C74375",
          "pantone_value": "17-2031"
        },
        "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      }
    }).as('getSingleResource');
  
    cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.deep.equal({
        "id": 2,
        "name": "fuchsia rose",
        "year": 2001,
        "color": "#C74375",
        "pantone_value": "17-2031"
      });
      expect(response.body.support).to.deep.equal({
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
      });
    });
  })

  it("GET Single Resource using Intercept Test", () => {
    cy.intercept('GET', '/api/unknown/2', {
      statusCode: 200,
      body: {
        "data": {
          "id": 2,
          "name": "fuchsia rose",
          "year": 2001,
          "color": "#C74375",
          "pantone_value": "17-2031"
        },
        "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      }
    }).as('getSingleResource');
 
    cy.visit('https://reqres.in/');
    cy.get('li[data-id="unknown-single"] a').click();
    cy.wait('@getSingleResource').then((interception) => {
      if (interception.response) {
        const responseBody = interception.response.body;
        // Assert the status code
        expect(interception.response.statusCode).to.eq(200);
        // Assert the user data
        expect(responseBody.data).to.deep.equal({
          "id": 2,
          "name": "fuchsia rose",
          "year": 2001,
          "color": "#C74375",
          "pantone_value": "17-2031"
        });
        // Assert the support data
        expect(responseBody.support).to.deep.equal({
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        });
 
    }
  })
})
////changed name and year
it("GET Single Resource using Intercept Test with changed response", () => {
  cy.intercept('GET', '/api/unknown/2', {
    statusCode: 200,
    body: {
      "data": {
        "id": 2,
        "name": "cerulean blue",
        "year": 2020,
        "color": "#007BA7",
        "pantone_value": "15-4020",
        "new_field": "This is a new field"
      },
      "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "This response has been modified for testing purposes."
      }
    }
  }).as('getSingleResource');

  cy.visit('https://reqres.in/');
  cy.get('li[data-id="unknown-single"] a').click();
  cy.wait('@getSingleResource').then((interception) => {
    if (interception.response) {
      const responseBody = interception.response.body;
      // Assert the status code
      expect(interception.response.statusCode).to.eq(200);
      // Assert the changed user data
      expect(responseBody.data).to.deep.equal({
        "id": 2,
        "name": "cerulean blue",
        "year": 2020,
        "color": "#007BA7",
        "pantone_value": "15-4020",
        "new_field": "This is a new field"
      });
      // Assert the changed support data
      expect(responseBody.support).to.deep.equal({
        "url": "https://reqres.in/#support-heading",
        "text": "This response has been modified for testing purposes."
      });

    }
  })
})

it("GET List Of Resource using Request Test", () => {
    cy.intercept('GET', '/api/unknown').as('getListOfResource');
  
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include({
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2
      });

      expect(response.body.data).to.deep.equal([
        {
          id: 1,
          name: "cerulean",
          year: 2000,
          color: "#98B2D1",
          pantone_value: "15-4020"
        },
        {
          id: 2,
          name: "fuchsia rose",
          year: 2001,
          color: "#C74375",
          pantone_value: "17-2031"
        },
        {
          id: 3,
          name: "true red",
          year: 2002,
          color: "#BF1932",
          pantone_value: "19-1664"
        },
        {
          id: 4,
          name: "aqua sky",
          year: 2003,
          color: "#7BC4C4",
          pantone_value: "14-4811"
        },
        {
          id: 5,
          name: "tigerlily",
          year: 2004,
          color: "#E2583E",
          pantone_value: "17-1456"
        },
        {
          id: 6,
          name: "blue turquoise",
          year: 2005,
          color: "#53B0AE",
          pantone_value: "15-5217"
        }
      ]);
      expect(response.body.support).to.deep.include({
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!"
      });
    });
});

it("GET List Of Resource using Intercept Test", () => {
    cy.intercept('GET', '/api/unknown', {
      statusCode: 200,
      body: {
        "page": 1,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
          {
            id: 1,
            name: "cerulean",
            year: 2000,
            color: "#98B2D1",
            pantone_value: "15-4020"
          },
          {
            id: 2,
            name: "fuchsia rose",
            year: 2001,
            color: "#C74375",
            pantone_value: "17-2031"
          },
          {
            id: 3,
            name: "true red",
            year: 2002,
            color: "#BF1932",
            pantone_value: "19-1664"
          },
          {
            id: 4,
            name: "aqua sky",
            year: 2003,
            color: "#7BC4C4",
            pantone_value: "14-4811"
          },
          {
            id: 5,
            name: "tigerlily",
            year: 2004,
            color: "#E2583E",
            pantone_value: "17-1456"
          },
          {
            id: 6,
            name: "blue turquoise",
            year: 2005,
            color: "#53B0AE",
            pantone_value: "15-5217"
          }
        ],
        "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
      }
    }).as('getListOfResources');
  
    cy.visit('https://reqres.in/');
    cy.get('li[data-id="unknown"] a').click();
  
    cy.wait('@getListOfResources').then((interception) => {
      if (interception.response) {
        const response = interception.response.body;
        expect(response.data.length).to.eq(6);
        expect(response.data[0]).to.deep.equal({
          id: 1,
          name: "cerulean",
          year: 2000,
          color: "#98B2D1",
          pantone_value: "15-4020"
        });

        expect(response.data[4]).to.deep.equal({
          id: 5,
          name: "tigerlily",
          year: 2004,
          color: "#E2583E",
          pantone_value: "17-1456"
        });

        expect(response.support.url).to.eq("https://reqres.in/#support-heading");
        expect(response.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
      }
    });
});

it("POST User using Request Test", () => {
  cy.intercept('POST', '/api/users').as('postUser');

  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/users',
    body: {
      name: 'morpheus',
      job: 'leader',
      id: '953'
    }
  }).then((response) => {
    expect(response.status).to.eq(201);

    expect(response.body).to.include({
      name: 'morpheus',
      job: 'leader',
      id: '953'
    });
    
   expect(response.body).to.have.property('createdAt');
  });
})

it("POST User using Intercept Test", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/users'
  }).as('PostUser')
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="post"] a').click();
  cy.wait('@PostUser').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(201);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('name', 'morpheus');
      expect(responseBody).to.have.property('job', 'leader');
      expect(responseBody).to.have.property('id');
      expect(responseBody).to.have.property('createdAt');
    }
  });
})

it("PUT User using Request Test", () => {
  cy.intercept('PUT', '/api/users/2').as('putUser');
 
  cy.request({
    method: 'PUT',
    url: 'https://reqres.in/api/users/2',
    body: {
      name: 'morpheus',
      job: 'zion resident'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
 
    expect(response.body).to.include({
      name: 'morpheus',
      job: 'zion resident'
    });
 
    expect(response.body).to.have.property('updatedAt');
  });
})

it("PUT User using Intercept Test",() => {
  cy.intercept({
    method: 'PUT',
    url: '/api/users/2',
    }).as('PutUser');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="put"] a').click();
  cy.wait('@PutUser').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        const responseBody = interception.response.body;
        expect(responseBody).to.have.property('name', 'morpheus');
        expect(responseBody).to.have.property('job', 'zion resident');
        expect(responseBody).to.have.property('updatedAt');
      }
 
  })
})
////added error message
it("PUT User Not Found (404)", () => {
  cy.intercept({
    method: 'PUT',
    url: '/api/users/2',
  }, {
    statusCode: 404,
    body: {
      error: "User not found"
    }
  }).as('PutUserNotFound');

  cy.visit('https://reqres.in/');
  cy.get('li[data-id="put"] a').click();

  cy.wait('@PutUserNotFound').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(404);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('error', 'User not found');
    }
  })
})
//added parrial content message
it("PUT User with Partial Content (206)", () => {
  cy.intercept({
    method: 'PUT',
    url: '/api/users/2',
  }, {
    statusCode: 206,
    body: {
      message: "Partial update successful",
      updatedFields: {
        job: "zion resident"
      }
    }
  }).as('PutUserPartialContent');

  cy.visit('https://reqres.in/');
  cy.get('li[data-id="put"] a').click();

  cy.wait('@PutUserPartialContent').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(206);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('message', 'Partial update successful');
      expect(responseBody.updatedFields).to.deep.equal({ job: "zion resident" });
    }
  })
})
 
it("DELETE User using Request Test", () => {
  cy.intercept('DELETE', '/api/users/2').as('deleteUser');
 
  cy.request({
    method: 'DELETE',
    url: 'https://reqres.in/api/users/2'
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
})

it("DELETE User using Intercept Test", () => {
  cy.intercept(
    {
      method: 'DELETE',
      url: '/api/users/2',
    }).as('DeleteUser');

    cy.visit('https://reqres.in/');
    cy.get('li[data-id="delete"] a').click();

    cy.wait('@DeleteUser').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(204);
        expect(interception.response.body).to.eq("");
      }
    }) 
})
////added message and reason
it("DELETE User using Intercept(204) with changed response(403) Test", () => {
  cy.intercept(
    {
      method: 'DELETE',
      url: '/api/users/2',
    },
    
    {
      statusCode: 403, // Force the response status code to be 403
      body: {
        message: "User deletion is forbidden.",
        reason: "You do not have permission to delete this user."
      } 
    }
    
  ).as('DeleteUser');

    cy.visit('https://reqres.in/');
    cy.get('li[data-id="delete"] a').click();

    cy.wait('@DeleteUser').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(204);
        expect(interception.response.body).to.eq("");
      }
    }) 
})

it("DELETE User using Intercept(204) with changed response(403) Test 2", () => {
  //include user data
  cy.intercept(
    {
      method: 'DELETE',
      url: '/api/users/2',
    },
    
    {
      statusCode: 403, // Force the response status code to be 403
      body: {
        message: "User deletion is forbidden.",
        user: {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          status: "Active"
        },
      reason: "This user is currently active and cannot be deleted." 
      }
    }
    
  ).as('DeleteUser');

    cy.visit('https://reqres.in/');
    cy.get('li[data-id="delete"] a').click();

    cy.wait('@DeleteUser').then((interception) => {
      if (interception.response) {
        
        // expect(interception.response.body).to.eq("");

        const responseBody = interception.response.body;
        expect(responseBody.message).to.eq("User deletion is forbidden.");
        expect(responseBody.user).to.deep.include({
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          status: "Active"
        });
        expect(responseBody.reason).to.eq("This user is currently active and cannot be deleted.");
        expect(interception.response.statusCode).to.eq(204);
      }
    }) 
})

it("POST Register Successful using Request Test", () => {
  cy.intercept('POST', '/api/register').as('postRegister');
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/register',
    body: {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include({
      "id": 4,
      "token": "QpwL5tke4Pnpja7X4"
    });
  });
})

it("POST Register Successful using Intercept Test", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/register'
  }).as('PostRegister');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="register-successful"] a').click();
  cy.wait('@PostRegister').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('id', 4);
      expect(responseBody).to.have.property('token','QpwL5tke4Pnpja7X4');
    }
  });
})

it("POST Register Successful using Intercept with changed response", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/register'
  },
  {
    statusCode: 200,
    body: {
      id: 99,  
      token: 'NewGeneratedToken12345',
      extraInfo: 'User registered successfully'
    }
  }).as('PostRegister');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="register-successful"] a').click();
  cy.wait('@PostRegister').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('id', 99); 
      expect(responseBody).to.have.property('token', 'NewGeneratedToken12345');
      expect(responseBody).to.have.property('extraInfo', 'User registered successfully'); 
    }
  })
})
////
it("POST Register with Bad Request(400) Intercept Test", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/register'
  },
  {
    statusCode: 400,
    body: {
      error: "Missing email or username"
    }
  }).as('PostRegister');
 
    cy.visit('https://reqres.in/');
    cy.get('li[data-id="register-successful"] a').click();
    cy.wait('@PostRegister').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(400);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('error', "Missing email or username");
    }
  })
})

it("POST Register Unsuccessful using Request Test", () => {
  cy.intercept('POST', '/api/register').as('postRegisterUnssuccesful');
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/register',
    body: {
       "email": "sydney@fife"
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.include({
      "error": "Missing password"
    });
  });
})

it("POST Register Unsuccessful using Intercept Test", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/register'
  }).as('PostRegisterUnssuccesful');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="register-unsuccessful"] a').click();

  cy.wait('@PostRegisterUnssuccesful').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(400);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('error','Missing password');
    }
  });
})

it("POST Login Successful using Request Test", () => {
  cy.intercept('POST', '/api/login').as('postLogin');
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/login',
    body: {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include({
      "token": "QpwL5tke4Pnpja7X4"
    });
  });
})

it("POST Login Successful using Intercept Test", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/login'
  }).as('PostLogin');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="login-successful"] a').click();
  cy.wait('@PostLogin').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('token','QpwL5tke4Pnpja7X4');
    }
  });
})

it("POST Login Unsuccessful using Request Test", () => {
  cy.intercept('POST', '/api/login').as('postLoginUnssuccesful');
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/login',
    body: {
       "email": "peter@klaven"
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.include({
      "error": "Missing password"
    });
  });
})

it("POST Login Unsuccessful using Intercept Test", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/login'
  }).as('PostLoginUnssuccesful');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="login-unsuccessful"] a').click();

  cy.wait('@PostLoginUnssuccesful').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(400);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('error','Missing password');
    }
  })
})

it("POST Login Unsuccessful with Incorrect Password", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/login'
  },
  {
    statusCode: 401,
    body: {
      error: "Incorrect password"
    }
  }).as('PostLoginUnsuccessful');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="login-unsuccessful"] a').click();

  cy.wait('@PostLoginUnsuccessful').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(401);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('error', 'Incorrect password');
    }
  })
})
////
it("POST Login Unsuccessful with Server Error (500)", () => {
  cy.intercept({
    method: 'POST',
    url: '/api/login'
  },
  {
    statusCode: 500,
    body: {
      error: "Internal server error"
    }
  }).as('PostLoginUnsuccessful');
 
  cy.visit('https://reqres.in/');
  cy.get('li[data-id="login-unsuccessful"] a').click();

  cy.wait('@PostLoginUnsuccessful').then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.eq(500);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('error', 'Internal server error');
    }
  })
})

it("GET Delayed Response using Request Test", () => {
  cy.intercept('GET', '/api/users?delay=3').as('getDelayedResponse');

  cy.request({
    method: 'GET',
    url: 'https://reqres.in/api/users?delay=3'
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include({
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
    });

    expect(response.body.data).to.deep.equal([
      {
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    {
        "id": 3,
        "email": "emma.wong@reqres.in",
        "first_name": "Emma",
        "last_name": "Wong",
        "avatar": "https://reqres.in/img/faces/3-image.jpg"
    },
    {
        "id": 4,
        "email": "eve.holt@reqres.in",
        "first_name": "Eve",
        "last_name": "Holt",
        "avatar": "https://reqres.in/img/faces/4-image.jpg"
    },
    {
        "id": 5,
        "email": "charles.morris@reqres.in",
        "first_name": "Charles",
        "last_name": "Morris",
        "avatar": "https://reqres.in/img/faces/5-image.jpg"
    },
    {
        "id": 6,
        "email": "tracey.ramos@reqres.in",
        "first_name": "Tracey",
        "last_name": "Ramos",
        "avatar": "https://reqres.in/img/faces/6-image.jpg"
    }
    ]);
    expect(response.body.support).to.deep.include({
      url: "https://reqres.in/#support-heading",
      text: "To keep ReqRes free, contributions towards server costs are appreciated!"
    });
  });
});

it("GET Delayed Response using Intercept Test", () => {
  cy.intercept('GET', '/api/users?delay=3', {
    statusCode: 200,
    body: {
      "page": 1,
      "per_page": 6,
      "total": 12,
      "total_pages": 2,
      "data": [
        {
          "id": 1,
          "email": "george.bluth@reqres.in",
          "first_name": "George",
          "last_name": "Bluth",
          "avatar": "https://reqres.in/img/faces/1-image.jpg"
        },
        {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        {
          "id": 3,
          "email": "emma.wong@reqres.in",
          "first_name": "Emma",
          "last_name": "Wong",
          "avatar": "https://reqres.in/img/faces/3-image.jpg"
        },
        {
          "id": 4,
          "email": "eve.holt@reqres.in",
          "first_name": "Eve",
          "last_name": "Holt",
          "avatar": "https://reqres.in/img/faces/4-image.jpg"
        },
        {
          "id": 5,
          "email": "charles.morris@reqres.in",
          "first_name": "Charles",
          "last_name": "Morris",
          "avatar": "https://reqres.in/img/faces/5-image.jpg"
        },
        {
          "id": 6,
          "email": "tracey.ramos@reqres.in",
          "first_name": "Tracey",
          "last_name": "Ramos",
          "avatar": "https://reqres.in/img/faces/6-image.jpg"
        }
      ],
      "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
      }
    }
  }).as('getDelayedResponse');

  cy.visit('https://reqres.in/');
  cy.get('li[data-id="delay"] a').click();

  cy.wait('@getDelayedResponse').then((interception) => {
    if (interception.response) {
      const response = interception.response.body;

      expect(response.page).to.eq(1);
      expect(response.per_page).to.eq(6);
      expect(response.total).to.eq(12);
      expect(response.total_pages).to.eq(2);

      expect(response.data.length).to.eq(6);
      expect(response.data[0]).to.deep.equal({
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://reqres.in/img/faces/1-image.jpg"
      });

      expect(response.data[3]).to.deep.equal({
        "id": 4,
        "email": "eve.holt@reqres.in",
        "first_name": "Eve",
        "last_name": "Holt",
        "avatar": "https://reqres.in/img/faces/4-image.jpg"
      });

      expect(response.support.url).to.eq("https://reqres.in/#support-heading");
      expect(response.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
    }
  });
});