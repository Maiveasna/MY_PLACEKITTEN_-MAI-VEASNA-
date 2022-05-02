
# PLACEKITTEN

### API DOC

https://documenter.getpostman.com/view/5578104/RWgqUxxh

## Run


```bash
  yarn
```

```bash
  cd ios && pod install
```

```bash
  yarn ios
```

### Issues

- Create a mobile application with react-native framework, application should
- Have two routes (they are usually called views or screens in iOS)
- Primary route (view) should be a list view in which all kittens should be displayed
- Secondary route (view) should be kitten info view
- List should display random kitten images with randomly generated names
- User should be able to specify count of displayed kitten items
- Image app functionality
- RN application should have basic navigation (from List view to Kitten view and back).
- App should have a filter popup which allows user to specify how many items to show using placekitten.com API (30/50/100).
- On application startup all images should be retrieved form API and each kitten should be assigned with randomly retrieved name from names array.
- Application should show some sort of progress (loading) indicator while images are being fetched.
- In Kitten view application should render kitten image at the top followed by it’s name and display kitten description below (Lorem Ipsum).
- In List view application should render all kittens as list items.
- If there are no internet connection user should see message with relevant information (it could be modal popup or text element in empty kitten list), for - example “Couldn't connect to the internet”.
- Allow user to specify count of items to retrieve
- Store kitten data in app redux state
- When all data is fetched for the first time store data in AsyncStorage, to allow user to review kittens when offline

## Mok UP

![RN_assignment_jr](https://user-images.githubusercontent.com/59038294/166175462-acd2e730-8afb-4a59-9479-293774301822.png)

## Technologies

- React Native / React
- React Navigation
- Redux
- Redux-thunk 
- ...


## Related 

- version 1.0.0


## Author

- [@maiveasna](https://github.com/Maiveasna)

