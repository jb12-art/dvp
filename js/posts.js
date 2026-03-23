// js/posts.js

import { supabase } from './supabase.js';
import { displayMessage } from './ui.js';
import { checkAuth, logout } from './auth.js';

checkAuth();

const postForm = document.querySelector('form');

postForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const title = form.title.value.trim();
  const content = form.content.value.trim();
  const fieldset = form.querySelector('fieldset');

  try {
    fieldset.disabled = true;

    const { error } = await supabase.from('posts').insert([{ title, content }]);

    if (error) {
      displayMessage('#js-message-container', 'error', error.message);
      return;
    }

    displayMessage(
      '#js-message-container',
      'success',
      'Post created successfully',
    );
    form.reset();
  } catch (error) {
    console.log(error);
    displayMessage('#js-message-container', 'error', error.toString());
  } finally {
    fieldset.disabled = false;
  }
});
