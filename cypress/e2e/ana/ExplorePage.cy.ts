import { explorePage } from "../../ui-manager/ana/pages/pages";
import { homePage } from "../../ui-manager/ana/pages/pages";

const explorePageURL = "https://ancabota09.wixsite.com/intern/explore";

beforeEach(() => {
    cy.visit("/")
  })

  it("Explore Hotel Text Section Test", () => {
    cy.visit(explorePageURL);

    explorePage.title()
        .should('exist')
        .should('have.text', 'EXPLORE THE HOTEL');
    
    explorePage.textBlock()
        .should('exist')
        .should('have.text', "Discover the elegance and comfort of our hotel. Nestled in the heart of the city, our establishment offers a unique blend of contemporary design and classic luxury. Whether you're here for business or leisure, our hotel provides an exceptional experience with top-notch amenities, personalized services, and a warm, welcoming atmosphere. Take a tour through our beautifully designed rooms, enjoy exquisite dining at our on-site restaurant, and unwind at our state-of-the-art spa. Let us make your stay unforgettable, providing you with the perfect home away from home.");

  })

  it("Amenities Test", () => {
    cy.visit(explorePageURL);

    explorePage.amenitiesTitle()
        .should('exist')
        .should('have.text', 'AMENITIES & SERVICES');

    //Cleaning amenity
    //image
    explorePage.cleaningImage()
      .invoke('attr', 'src')
      .should('contain', '9c608a_40c6a63735ab47b096691cfd25e22168.png');

    //title
    explorePage.cleaningTitle()
      .invoke('text')
      .should('equal', 'Cleaning Services\n');

    //Parking amenity
    //image
    explorePage.parkingImage()
      .invoke('attr', 'src')
      .should('contain', '9c608a_faef9c2646824b4cb7d694d28e246dae.png');

    //title
    explorePage.parkingTitle()
      .invoke('text')
      .should('equal', 'Free Parking\n');

  //Furnish amenity
    //image
    explorePage.furnishImage()
      .invoke('attr', 'src')
      .should('contain', '9c608a_3c58fe1f4ad24cac8823dbfb3445a4e6.png');

    //title
    explorePage.furnishTitle()
      .invoke('text')
      .should('equal', 'Fully Furnished\n');

    //WiFi amenity
    //image
    explorePage.wiFiImage()
      .invoke('attr', 'src')
      .should('contain', '9c608a_b504533992514b198819a54f27520449.png');

    //title
    explorePage.wiFiTitle()
      .invoke('text')
      .should('equal', 'Free WiFi\n');

     //Airport amenity
    //image
    explorePage.airportImage()
      .invoke('attr', 'src')
      .should('contain', '9c608a_b7451c0859164f889f85d82de735148e.png');

    //title
    explorePage.airportTitle()
      .invoke('text')
      .should('equal', 'Airport Transfers\n');
      
  }) 

  it("Explore City Block Test", () => {
    cy.visit(explorePageURL);

    explorePage.exploreCityBlock()
      .should('exist');
    
    explorePage.exploreCityTitle()
      .should('exist')
      .should('have.text', 'EXPLORE THE CITY');

    explorePage.cityTitles()
      .should('exist')
      .should('have.length', 3);

    explorePage.cityImages()
      .should('exist')
      .should('have.length', 3);

    explorePage.cityDescriptions()
      .should('exist')
      .should('have.length', 3);

      const cities = [
        {
            title: 'Chinatown',
            description: "Discover the vibrant heart of Chinatown, where the rich blend of traditional culture and modern urban energy creates a unique and captivating atmosphere. Wander through its bustling streets, savoring authentic Asian cuisine and exploring colorful markets and historic landmarks.",
            imageSrc: '9c608a_14eb60e42d3a42f29fe67d9b579e26de.jpg'
        },
        {
            title: 'Haight & Ashbury',
            description: "Haight & Ashbury is a famous neighborhood in San Francisco, known for its pivotal role in the 1960s counterculture movement. It features colorful Victorian houses, eclectic shops, and vibrant street art, reflecting its rich history and bohemian spirit.",
            imageSrc: '9c608a_569e962c58334d07a4048e125af8fb82.jpg'
        },
        {
            title: 'Golden Gate Bridge',
            description: "The Golden Gate Bridge is an iconic suspension bridge connecting San Francisco to Marin County, renowned for its striking International Orange color and Art Deco design. Spanning 1.7 miles across the Golden Gate Strait, it offers breathtaking views of the bay and is a symbol of American engineering excellence.",
            imageSrc: '9c608a_66f0495affeb412ba01b0d9f0bd3dd6b.jpg'
        }
      ];

      cities.forEach((city, index) => {
        const title = explorePage.cityTitles().eq(index);
        const description = explorePage.cityDescriptions().eq(index);
        //console.log(description);
        const image = explorePage.cityImages().eq(index);

        title.then(($title) => {
          const titleText = $title.text();
          expect(titleText).to.equal(city.title);
        });

        image.then(($image) => {
          const imgSrc = $image.attr('src');
          expect(imgSrc).to.include(city.imageSrc);
        });

        description.then(($description) => {
          const descriptionText = $description.text();
          expect(descriptionText).to.not.equal(city.description);
        });

      });
        
  })


