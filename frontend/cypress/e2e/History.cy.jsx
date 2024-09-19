describe('Sensor History Component Tests with Mocked Data', () => {
    beforeEach(() => {

      cy.intercept('GET', '**/api/v1/devices', {
        statusCode: 200,
        body: {
              "statusCode": 200,
              "data": [

                {
                  "id": 3,
                  "room_number": "D207",
                  "deviceId": "eui-3000024b080301f5",
                  "dev_eui": "3000024b080301f5",
                  "createdAt": "2024-09-16T01:25:05.702Z",
                  "updatedAt": "2024-09-16T01:25:05.702Z",
                  "blockId": 1
                },
              ],
              "nextPage": null
            }
        }).as('getSensorData');

        cy.intercept('GET', '**/api/v1/rooms/latest/3000024b080301f5', {
        "statusCode": 200,
        "data": {
          "id": 4,
          "co2": "647",
          "temperature": "22",
          "createdAt": "2024-09-16T01:25:05.736Z",
          "updatedAt": "2024-09-16T01:25:05.736Z",
          "deviceId": "eui-3000024b080301f5",
          "dev_eui": "3000024b080301f5",
          "device": {
            "id": 2,
            "room_number": "D207",
            "deviceId": "eui-3000024b080301f5",
            "dev_eui": "3000024b080301f5",
            "createdAt": "2024-09-16T01:25:05.695Z",
            "updatedAt": "2024-09-16T01:25:05.695Z",
            "blockId": 2
          }
        }
        }).as('getRoomData');

        const todayDateDataOne = new Date().toISOString();
        const todayDateDataTwo = new Date(todayDateDataOne);
        todayDateDataTwo.setMinutes(todayDateDataTwo.getMinutes() - 5);
        
        // Current date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        // Get the date one week ago
        const weekAgoDate = new Date(currentDate); // Create a new Date object based on currentDate
        weekAgoDate.setDate(weekAgoDate.getDate() - 6); // Go back one week
        const formattedWeekAgoDate = weekAgoDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Get the date one month ago
        const monthAgoDate = new Date(currentDate); // Create a new Date object based on currentDate
        monthAgoDate.setDate(monthAgoDate.getDate() - 30); // Go back one week
        const formattedMonthAgoDate = monthAgoDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Get the set date
        const specificDate = new Date('2024-08-15T00:00:00Z').toISOString();
        
        cy.intercept('GET', `**/api/v1/rooms/history/3000024b080301f5?beforeDate=${formattedDate}&afterDate=${formattedDate}`, {
          statusCode: 200,
          body: { // Ensure the response is wrapped in a body object
            data: [
              {
                id: 4,
                co2: "850",
                temperature: "22",
                createdAt: todayDateDataOne,
                updatedAt: todayDateDataOne,
                deviceId: "eui-3000024b080301f5",
                dev_eui: "3000024b080301f5"
              },
              {
                id: 3,
                co2: "400",
                temperature: "19",
                createdAt: todayDateDataTwo,
                updatedAt: todayDateDataTwo,
                deviceId: "eui-3000024b080301f5",
                dev_eui: "3000024b080301f5"
              }
            ]
          }
        }).as('getTodayData');
        
    cy.intercept('GET', `**/api/v1/rooms/history/3000024b080301f5?beforeDate=${formattedWeekAgoDate}&afterDate=${formattedDate}`, {
      statusCode: 200,
      body: { // Ensure the response is wrapped in a body object
        data: [
          {
            id: 4,
            co2: "850",
            temperature: "22",
            createdAt: todayDateDataOne,
            updatedAt: todayDateDataOne,
            deviceId: "eui-3000024b080301f5",
            dev_eui: "3000024b080301f5"
          },
          {
            id: 3,
            co2: "400",
            temperature: "19",
            createdAt: todayDateDataTwo,
            updatedAt: todayDateDataTwo,
            deviceId: "eui-3000024b080301f5",
            dev_eui: "3000024b080301f5"
          }
        ]
      }
    }).as('getWeekData');

    cy.intercept('GET', `**/api/v1/rooms/history/3000024b080301f5?beforeDate=${formattedMonthAgoDate}&afterDate=${formattedDate}`, {
      statusCode: 200,
      body: { // Ensure the response is wrapped in a body object
        data: [
          {
            id: 4,
            co2: "850",
            temperature: "22",
            createdAt: todayDateDataOne,
            updatedAt: todayDateDataOne,
            deviceId: "eui-3000024b080301f5",
            dev_eui: "3000024b080301f5"
          },
          {
            id: 3,
            co2: "400",
            temperature: "19",
            createdAt: todayDateDataTwo,
            updatedAt: todayDateDataTwo,
            deviceId: "eui-3000024b080301f5",
            dev_eui: "3000024b080301f5"
          }
        ]
      }
    }).as('getMonthData');

    cy.intercept('GET', `**/api/v1/rooms/history/3000024b080301f5?beforeDate=2024-08-15&afterDate=2024-08-15`, {
      statusCode: 200,
      body: { // Ensure the response is wrapped in a body object
        data: [
          {
            id: 4,
            co2: "850",
            temperature: "22",
            createdAt: specificDate,
            updatedAt: specificDate,
            deviceId: "eui-3000024b080301f5",
            dev_eui: "3000024b080301f5"
          },
          {
            id: 3,
            co2: "400",
            temperature: "19",
            createdAt: specificDate,
            updatedAt: specificDate,
            deviceId: "eui-3000024b080301f5",
            dev_eui: "3000024b080301f5"
          }
        ]
      }
    }).as('getSpecificData');
    
  });
  
    it('SensorHistory component loads', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[data-cy="SensorHistory"]').should('be.visible');
    });
  
    it('QuickFilter component loads', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[data-cy="QuickFilter"]').should('be.visible');
    });
  
    it('SensorFilter component loads', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[data-cy="SensorFilter"]').should('be.visible');
    });
  
    it('QuickFilter Today test', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[aria-label="Today"]').should('be.visible').click();
      cy.wait('@getTodayData');
      console.log("Today data")
      // Hover at first position and capture the tooltip text
      cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
      cy.wait(500);
      cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible');
    });
  
    it('QuickFilter Week test', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[aria-label="Last week"]').should('be.visible').click();
  
      let tooltipText1, tooltipText2;
  
      cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
      cy.wait(500);
      cy.get('[data-testid="tooltip"]', { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .then((text1) => {
          tooltipText1 = text1;
        });
  
      cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 600, y: 200 }, { force: true });
      cy.wait(500);
      cy.get('[data-testid="tooltip"]', { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .then((text2) => {
          tooltipText2 = text2;
  
          expect(tooltipText1).to.not.equal(tooltipText2);
        });
    });
  
    it('QuickFilter Month test', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[aria-label="Last month"]').should('be.visible').click();
  
      let tooltipText1, tooltipText2;
  
      cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
      cy.wait(500);
      cy.get('[data-testid="tooltip"]', { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .then((text1) => {
          tooltipText1 = text1;
        });
  
      cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 600, y: 200 }, { force: true });
      cy.wait(500);
      cy.get('[data-testid="tooltip"]', { timeout: 10000 })
        .should('be.visible')
        .invoke('text')
        .then((text2) => {
          tooltipText2 = text2;
  
          expect(tooltipText1).to.not.equal(tooltipText2);
        });
    });
  
    it('Forum test passing', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[data-cy="startLabel"]').click().type('2024-08-15');
      cy.get('[data-cy="endLabel"]').click().type('2024-08-15');
      cy.get('[data-cy="submitButton"]').click();
  
      // Hover at first position and capture the tooltip text
      cy.get('[class="recharts-surface"]').first().trigger('mousemove', { x: 100, y: 100 }, { force: true });
      cy.wait(500);
      cy.get('[data-testid="tooltip"]', { timeout: 10000 }).should('be.visible');
    });
  
    it('Forum test fail', () => {
      cy.visit('http://localhost:5173/D-Block/D207');
      cy.wait('@getSensorData');
      cy.get('[data-cy="startLabel"]').click().type('2023-08-15');
      cy.get('[data-cy="endLabel"]').click().type('2023-08-15');
      cy.get('[data-cy="submitButton"]').click();
      // Assert on expected behavior when test data fails (you can add your logic here)
    });
  });
  