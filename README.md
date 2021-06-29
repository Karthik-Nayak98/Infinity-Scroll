# Infinity Scroll

- I am using Unsplash API for getting the images.
- Loader Icon is obtained from the website https://loading.io/
- API Keys are put in the netlify servers and apikey.js file will be generated
  when building the file.

### Build command

```
echo -e "export const API_KEY = 'YOUR_API_KEY';" > apikey.js
```

## Demo

![link](/assets/infinite-scroll.gif)

You can find the website live
[here](https://unsplash-infinityscroll.netlify.app/)

**Note:** Free version of unsplash API can only handle 50 requests per hour. The
webapp might crash if the number of requests exceeds.
