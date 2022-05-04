/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentZone: string;
let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    const config = [
        {
            zone: 'unoHelp',
            message: 'You may play Uno with your friends! Go to the nearby tables and press SPACE when prompted to try!',
            cta: [
                {
                    label: 'That\'s nice!',
                    className: 'primary',
                    callback: () => {
                        if (currentPopup !== undefined) {
                            currentPopup.close();
                            currentPopup = undefined;
                        }
                    }
                }
            ]        
        },
        {
            zone: 'followUs',
            message: 'Love what you are seeing?',
            cta: [
                {
                    label: 'Like our Facebook Page‎',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://web.facebook.com/DPSM.CAS.UPM'),
                },
            ]
        },
        {
            zone: 'S1Site',
            message: 'S1 is sharing a website! Would you like to see?',
            cta: [
                {
                    label: 'Sure!',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://sites.google.com/up.edu.ph/weaving-mathematics/home?authuser=0'),
                },
            ]
        },
        {
            zone: 'S2Site',
            message: 'S2 is sharing a result from their work! Would you like to see?',
            cta: [
                {
                    label: 'Sure!',
                    className: 'primary',
                    callback: () => WA.nav.openTab('https://www.canva.com/design/DAE_ujoeYo8/view?embed'),
                },
            ]
        },
    ]

    WA.ui.registerMenuCommand("Post to Community Board", () => {
        WA.nav.openTab('https://padlet.com/embed/8zfe6tkznhlpexon')
    })

    WA.ui.registerMenuCommand("Vote for Best Booth", () => {
        WA.nav.openTab('https://docs.google.com/forms/d/e/1FAIpQLSfukx1sY8GsjftP6Qmkj4xEdZsUGUseXPEPm_d8kABT817OHQ/viewform')
    })

    


    WA.room.onEnterZone('unoHelp', () => {
        currentZone = 'unoHelp'
        openPopup(currentZone, currentZone + 'Popup')
    });
    WA.room.onLeaveZone('unoHelp', closePopUp)
    
    WA.room.onEnterZone('followUs', () => {
        currentZone = 'followUs'
        openPopup(currentZone, currentZone + 'Popup')
    });
    WA.room.onLeaveZone('followUs', closePopUp)

    WA.room.onEnterZone('S1Site', () => {
        currentZone = 'S1Site'
        openPopup(currentZone, currentZone + 'Popup')
    });
    WA.room.onLeaveZone('S1Site', closePopUp)
    
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    function openPopup(zoneName: string, popupName: string) {
        const zone = config.find((item) => {
            return item.zone == zoneName
        });
        if (typeof zone !== 'undefined') {
            // @ts-ignore otherwise we can't use zone.cta object
            currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
        }
    }

    function closePopUp(){
        if (currentPopup !== undefined) {
            currentPopup.close();
            currentPopup = undefined;
        }
    }
    
    
}).catch(e => console.error(e));




