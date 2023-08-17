import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export default instance;
