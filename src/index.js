import './styles.css';
import _ from 'lodash';

import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import { error } from '@pnotify/core';
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "../node_modules/@pnotify/confirm/dist/PNotifyConfirm.css";

import apiService from './js/apiService';
import { refs } from './js/refs';
import imgListTpl from './templates/images-list.hbs'

refs.form.addEventListener('input', _.debounce(onSearchImg, 500));
refs.btn.addEventListener('click', onGetMoreImages);


async function onSearchImg(evt) {
    evt.preventDefault();
    clearContainer();

    apiService.query = evt.target.value.trim();
    apiService.resetPage();

    if (apiService.query.trim() === '') {
        refs.btn.disabled = true;
        error({ text: "Please, enter your request!" });
        return;
    }

    try {
        const array = await apiService.fetchImages();
        renderCountryCard(array);

        if (array.total === 0) {
            showNotFound();
        }

        console.log(array);
        refs.btn.disabled = false;
        refs.container.addEventListener('click', showModal);
                    
    } catch {
        console.log('error')
    }
     
}

async function onGetMoreImages(evt) {
    evt.preventDefault();

    const array = await apiService.fetchImages();
    renderCountryCard(array);
    refs.container.scrollIntoView({ behavior: 'smooth', block: 'end', });      
}

function renderCountryCard(img) {
    const markup = imgListTpl(img);
    refs.container.insertAdjacentHTML('beforeend', markup);
}

function clearContainer() {
    refs.container.innerHTML = '';
}

function showNotFound() {
    error({
        text:"Nothing was found for your request!",
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                        text: "Ok",
                        primary: true,
                        click: notice => {
                            notice.close();
                        }
                        }
                    ]
                }
            ]
        ])
    });
}


function showModal(evt) {
    if (evt.target.nodeName === 'IMG') {
        const instance = basicLightbox.create(`<img src="${evt.target.dataset.source}">`);
        instance.show();
    }      
}
        
