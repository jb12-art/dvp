// js/login.js

import { supabase } from './supabase.js';
import { displayMessage } from './ui.js';

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;
  const fieldset = form.querySelector('fieldset');

  try {
    fieldset.disabled = true;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      displayMessage('#js-message-container', 'error', error.message);
      return;
    }

    if (data.user) {
      console.log('user', data.user);
      console.log('session', data.session);
      location.href = 'index.html';
    }
  } catch (error) {
    displayMessage('#js-message-container', 'error', error.toString());
  } finally {
    fieldset.disabled = false;
  }
});
