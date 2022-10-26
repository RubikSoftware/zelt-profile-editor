# Zelt Profile Editor


Here is Zelt Profile Editor! This task is done considering User experience, and the Zelt product you showed in our interview. So I decided to create different pages for user data

- Personal Data: containing First name, Last Name, Date of Birth
- Contract Data: Salary, bonus, Start Date, and leave dates

I applied the same changes to the API. The reason for this implementation is that I think it's something that users are familiar with, and it's in accordance with your product as well.

Similar extra fields can be added easily to both pages. I skipped this part as I thought you also wanted to receive the task in just a couple of days.

Another feature that I worked on was data caching of requests. Thereby, users will not face any delays every time they switch pages, and will improve their experiences. To achieve this goal, I installed redux and stored fetched data there.

The task is designed and implemented to support different screens and will work smoothly on devices from mobile phones to desktops.

In terms of the UI library, I installed MUI. Further improvements for User experience, such as notifications, are also implemented to show submission messages whenever the user updates the forms.


Some tests for both pages have also been added to test initial data fetching, the correct preview of elements on the screen, and suitable changes to each input element and button based on the user's interaction.

### Future improvements

We can add more diverse fields for each page, in addition to writing more tests for components to cover edge cases.