import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: '',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'text',
                title: 'Text',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'reorder',
                url: '/text',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            }, {
                id: 'csv',
                title: 'Upload CSV',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'cloud_upload',
                url: '/csv',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.UPLOAD',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            }, {
                id: 'twitter',
                title: 'Twitter',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'chat',
                url: '/twitter',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            }
        ]
    }
];
