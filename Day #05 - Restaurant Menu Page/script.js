const menu = [
    {
        id: 1,
        title: "Rendang",
        category: "lunch",
        price: 4.29,
        img: "./images/item-1.jpg",
        desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
        id: 2,
        title: "Rawon",
        category: "lunch",
        price: 2.79,
        img: "./images/item-2.jpg",
        desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
        id: 3,
        title: "Nasi Goreng Pedas",
        category: "shakes",
        price: 1.63,
        img: "./images/item-3.jpg",
        desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
        id: 4,
        title: "Mie Goreng Pedas",
        category: "breakfast",
        price: 1.58,
        img: "./images/item-4.jpg",
        desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
        id: 5,
        title: "Pempek Palembang",
        category: "lunch",
        price: 3.49,
        img: "./images/item-5.jpg",
        desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
        id: 6,
        title: "Pangsit Mie Bakso",
        category: "shakes",
        price: 1.25,
        img: "./images/item-6.jpg",
        desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
        id: 7,
        title: "Sate",
        category: "dinner",
        price: 2.35,
        img: "./images/item-7.jpg",
        desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
        id: 8,
        title: "Nasi Pecel",
        category: "breakfast",
        price: 1.2,
        img: "./images/item-8.jpg",
        desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
        id: 9,
        title: "Martabak Telur",
        category: "shakes",
        price: 2.45,
        img: "./images/item-9.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 10,
        title: "Nasi Ayam Geprek",
        category: "dinner",
        price: 2.76,
        img: "./images/item-10.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 11,
        title: "Martabak Manis",
        category: "dinner",
        price: 2.49,
        img: "./images/item-11.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 12,
        title: "Kue Pukis",
        category: "breakfast",
        price: 1.12,
        img: "./images/item-12.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 13,
        title: "Seblak",
        category: "lunch",
        price: 1.2,
        img: "./images/item-13.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 14,
        title: "Siomay Ayam",
        category: "breakfast",
        price: 1.29,
        img: "./images/item-14.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 15,
        title: "Nastar",
        category: "shakes",
        price: 2.20,
        img: "./images/item-15.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
        id: 16,
        title: "Pie Susu",
        category: "shakes",
        price: 1.3,
        img: "./images/item-16.jpg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
];
// get parent element
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");
// display all items when page loads
window.addEventListener("DOMContentLoaded", function () {
    diplayMenuItems(menu);
    displayMenuButtons();
});

function diplayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
        // console.log(item);

        return `<article class="menu-item">
            <img src=${item.img} alt=${item.title} class="photo" />
            <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
              </header>
              <p class="item-text">
                ${item.desc}
              </p>
            </div>
          </article>`;
    });
    displayMenu = displayMenu.join("");
    // console.log(displayMenu);

    sectionCenter.innerHTML = displayMenu;
}
function displayMenuButtons() {
    const categories = menu.reduce(
        function (values, item) {
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        },
        ["all"]
    );
    const categoryBtns = categories
        .map(function (category) {
            return `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
          </button>`;
        })
        .join("");

    btnContainer.innerHTML = categoryBtns;
    const filterBtns = btnContainer.querySelectorAll(".filter-btn");
    console.log(filterBtns);

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            // console.log(e.currentTarget.dataset);
            const category = e.currentTarget.dataset.id;
            const menuCategory = menu.filter(function (menuItem) {
                // console.log(menuItem.category);
                if (menuItem.category === category) {
                    return menuItem;
                }
            });
            if (category === "all") {
                diplayMenuItems(menu);
            } else {
                diplayMenuItems(menuCategory);
            }
        });
    });
}