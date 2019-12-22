# Gong Reporting Dashboard
This is a project maintained by the Solutions Engineering team @ Drift. It is a browser-side analysis of Gong data displayed in a UI. To see in action go here but keep in mind this will only work if you're authenticated in Drift's Gong instance: https://joshuaperk.github.io/gong-reporting-dashboard/. If you want to repurpose this for your own team, clone the repo and make edits to hard-coded company-id, user ids, and the data-layer we made in `assets/js/script.js`.

## Usage
1. Login to https://app.gong.io
2. Navigate to https://joshuaperk.github.io/gong-reporting-dashboard/
3. Set your filters (start and end dates are only needed when the `timeframe` filter is set to `Custom`)
4. Click `Generate URL + 📋` and wait for the new browser page to completely load (no spinning process bar - this may take up to 30 seconds for large results)
5. Copy the body of the new window and return to the previous tab. Paste it into the `Gong API data` input. Click `Process data`.

## Gong API Query Structure
In order to generate the JSON from Gong to populate this dashboard, you'll need to authenticate yourself by logging in to Gong.io and then in your browser's URL bar, submit an HTTPS request to Gong. Although you can navigate to the calls page in Gong, select your filters, and view the network traffic to grab the HTTPS request URL, this wiki page is designed to breakdown the syntax so we can build our own URL generator for speedier reporting.

### Base URL
The most basic URL structure is `https://app.gong.io/calls/ajax/calls?company-id=3568831574419877865&pageSize=10&offset=0&callSearch={}` where `3568831574419877865` is Drift's company id, `pageSize` represents the max number of results you're looking for `offset` can be set for help with paginating through large amounts of results and the `callSearch` object holds filter information.

All four of these parameters must be present; otherwise Gong will return a 404.

### Filtering examples
To build off the base URL and provide additional levels of filtering, you'd replace the basic `callSearch={}` with `callSearch={"search":{"type":"And","filters":[ ... ]}}` where `...` should be replaced with at least one if not multiple comma-separated filters like the examples below. It appears Gong uses a MongoDB-type search structure.

**Last 30 Days:** `{"type":"RelativeCallTime","last":30,"unit":"DAYS"}`

**This Month:**	`{"type":"PredefinedCallTime","period":"THIS_MONTH"}`

**External:** `{"type":"InternalMeeting","internal":false,"external":true,"missing":true}`

**Date Range:** `{"type":"AbsoluteCallDateRange","from":"2019-12-01","to":"2019-12-21"}`

**Single Participant** `{"type":"Participant","userIds":["9088225365379367685"]}`

**Multiple Participants** `{"type":"Participant","userIds":["9088225365379367685","8948771410146644384","1341274696220001313","4618243625088269996"]}`

### Solutions Team Participant IDs
**Joshua Perk:** 9088225365379367685

**Nate Hoffelmeyer:** 8948771410146644384

**Ashley Basinger:** 1341274696220001313

**David Thompson:** 4618243625088269996
