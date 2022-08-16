import React from 'react';

const graphListData = [
    {
        data: [
            { name: 'Group A', value: 100 },
            { name: 'Group B', value: 400 },
        ],
        COLORS: ['#EFCCFA', '#BA6AE8'],
        cardName: 'Overall'
    },
    {
        data: [
            { name: 'Group A', value: 100 },
            { name: 'Group B', value: 400 },
        ],
        COLORS: ['#E9F4CC', '#8BCA2B'],
        cardName: 'Process'
    },
    {
        data: [
            { name: 'Group A', value: 100 },
            { name: 'Group B', value: 400 },
        ],
        COLORS: ['#EEF2F3', '#A8BCC3'],
        cardName: 'KPI'
    },

]

export default graphListData;

export const overallGraph = [{
    dataItem:
        [{
            data: [
                { name: 'Group A', value: 100 },
                { name: 'Group B', value: 500 },
            ],
            COLORS: ['#EFCCFA', '#BA6AE8'],
            innerRadius: 30,
            outerRadius: 50,
            desktopInnerRadius: 60,
            desktopOuterRadius: 90,
        }
        ],
    cardName: 'Overall'
}]
  

export const processGraph = [{
    dataItem:
        [{
            data: [
                { name: 'Group A', value: 100 },
                { name: 'Group B', value: 500 },
            ],
            COLORS: ['#E9F4CC', '#8BCA2B'],
            innerRadius: 30,
            outerRadius: 50,
            desktopInnerRadius: 60,
            desktopOuterRadius: 90,
        }
        ],
    cardName: 'Process'
}]

export const KpiGraph = [{
    dataItem:
        [{
            data: [
                { name: 'Group A', value: 100 },
                { name: 'Group B', value: 0 },
            ],
            COLORS: ['#EEF2F3', '#A8BCC3'],
            innerRadius: 30,
            outerRadius: 50,
            desktopInnerRadius: 60,
            desktopOuterRadius: 90,
        }
        ],
    cardName: 'KPI'
}]

export const Interventions = [{
    dataItem:
        [{
            data: [
                { name: 'Group A', value: 100 },
                { name: 'Group B', value: 0 },
            ],
            COLORS: ['#EEF2F3', '#A8BCC3'],
            innerRadius: 30,
            outerRadius: 50,
            desktopInnerRadius: 60,
            desktopOuterRadius: 90,
        }
        ],
    cardName: 'Interventions'
}]

export const Exercise = [{
    dataItem:
        [{
            data: [
                { name: 'Group A', value: 100 },
                { name: 'Group B', value: 0 },
            ],
            COLORS: ['#EEF2F3', '#A8BCC3'],
            innerRadius: 30,
            outerRadius: 50,
            desktopInnerRadius: 60,
            desktopOuterRadius: 90,
        }
        ],
    cardName: 'Exercise'
}]


export const footerList = [
    {
        img: '/dashboard.png',
        text: 'Dashbord'
    },
    {
        img: '/workplace-wellness.png',
        text: 'Workplace Wellness'
    },
    {
        img: '/personal_wellness.png',
        text: 'Personal Wellness'
    },
    {
        img: '/Settings.png',
        text: 'Settings'
    }

]

export const dashboardFooterList = [
    {
        img: '/report.png',
        text: 'Report',
    },
    {
        img: '/dashboard.png',
        text: 'Dashbord'
    },
    {
        img: '/search.png',
        text: 'Search'
    },


]