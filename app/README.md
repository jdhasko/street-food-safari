# Street Food Safari Challenge - Solution

Welcome to my solution to the [Street Food Safari Challenge](https://github.com/Teton-ai/street-food-safari).

In this readme you will find information about the solution, the creation process and about how you can run the solution.

The challenge was a lot of fun and I hope that you will like my solution
and maybe contribute with some feedback.

Throughout the process I assumed that I cannot change the API, so
I mostly did workarounds in the app where it was necessary.

## How to Run

1. **Start the API server** (from the root directory):

   ```bash
   cd ../api && npm install && npm run dev
   ```

2. **Configure API URL** in `src/constants/url.ts`:
   - Simulator/Emulator: `http://localhost:3333`
   - Physical device: Your computer's local IP (e.g., `http://192.168.1.141:3333`)

3. **Install dependencies and start the app**:

   ```bash
   cd ../app
   npm install
   npm start
   ```

4. **Run on your platform**:
   - iOS: `npm run ios` (macOS only)
   - Android: `npm run android`
   - Physical device: Scan QR code with Expo Go app

## Solution Development Process

### (UI) Design decisions

- As there was no UI design provided, I quickly sketched up some low-fidelity wireframes to provide a visual base for the solution.
- Included a light-weight loading animation (could be replaced for lower-end devices, but it shouldn't be an issue.)
- I decided to move the search outside of list header (hope that’s ok) to instead stick it to top and provide better UX.

### Architecture decisions

- **File structure**: Organized the code into logical folders - hooks/ for business logic, components/ for UI, api/ for API calls, contexts/ for global state, and utils/ for helper functions. Keeps things easy to find and maintain.

- **State management**: In order to keep this solution light-weight I decided not to use a state management library, so I just used local states for the most and react context for the favorites.

- **Custom hooks pattern**: I separated all the business logic into custom hooks (like useVendors, useSearchVendors, useVendorDetails). This keeps the components clean and makes the logic reusable and easier to test.

- **Error handling**: I tried to handle errors properly everywhere with user-friendly messages and retry options. For favorites, I went with optimistic updates - the UI updates immediately and rolls back if the API call fails. Makes the app feel faster.

- **Styling**: For styling I used NativeWind(TailwindCSS) and implemented some very basic themeing to maintain consistency.

### Performance

- I used AbortController for search to cancel requests when the user types again (prevents race conditions)

- Added debouncing to search (350ms delay) to avoid too many API calls

- Used refs to prevent duplicate API calls during fast scrolling in infinite scroll

- The search cancellation was important because without it, you could get results in the wrong order if you typed fast

## Tradeoffs & Decisions

- **Context API vs Redux/Zustand**: I chose the Context API because it's built-in and sufficient for this scope. Redux would be overkill for just favorites state. If the app grew bigger, I'd probably reconsider either Redux or Zustand.

- **Filtering approach**: The API doesn't have a dedicated endpoint for getting all cities/cuisines, so I extract them from the loaded vendors. This means filter options only show what you've already loaded, not all available options. It's not ideal, but it works without changing the API.

- **Refresh behavior**: When you pull to refresh, I clear the list first before loading new data. This causes a brief flicker, but I left it this way to demonstrate explicit list resetting. In production, I'd probably keep the old data visible until new data arrives.

- **Search debounce timing**: Set to 350ms - fast enough to feel responsive, but slow enough to avoid excessive API calls. Could be tuned based on user feedback.

- **Optimistic updates for favorites**: The favorite button updates immediately, then syncs with the API. If it fails, it rolls back. Makes the app feel much smoother. It does add a bit of complexity, but I think it's worth it for this use case.

- **Favorites list implementation**: The favorites screen filters from all loaded vendors rather than fetching favorites separately. This works but means you need to load vendors first. If there was a /favorites endpoint, I'd use that instead.

## Extra Features

- **City and Cuisine filters**: As suggested I implemented the optional filters with a bottom sheet UI. You can filter by city or cuisine, and the options are extracted dynamically from loaded vendor data. The filter pills show what's selected and can be cleared easily.
  (From a UX POV, I'd move things around if the functionality was available combined with the search as well. It would be nice to have the pills directly under the search bar.)

- **Map preview**: Since I had access to some location data I added a map preview on the vendor details screen showing the vendor's location. It's static (not interactive) but would give users a sense of where the vendor is (if the data wasn't fake :D).

- **Enhanced loading states**: Used Lottie animation for the loading state on the About screen where the /slow endpoint is called. Makes waiting feel less painful. (could be standardised across all relevant use cases)

- **Search improvements**: I implemented some basic additional features to the search:
  - Clear button in search input
  - Shows result count when searching
  - Properly handles empty states and errors
  - Cancels previous requests when typing (no race conditions)

## Testing

1. **Manual testing on iOS and Android**
   - Manual testing was performed on a physical iOS device (iPhone 16 Pro)
   - Manual testing was performed on an Android emulator (Nexus 5 API 30)

2. **Scenarios (examples)**
   - Error handling: Network failures, API errors, empty responses
   - Edge cases: Empty vendor lists, no search results, rapid scrolling during infinite load
   - State management: Favorites sync across screens, optimistic updates with rollback on failure

## Limitations

- Pagination is not supported for the Search endpoint and it only returns first 20 results no matter what.
- The app only supports and forces light mode.
- Implementation of the filtering is not optimal. It would be great to have an API endpoint specifically for the cities and cuisines.
- extractFilterOptions only processes currently loaded vendors, not all available options
