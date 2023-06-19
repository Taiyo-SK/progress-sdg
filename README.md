![alt text](https://github.com/Taiyo-SK/progressSDG/blob/main/static/screenshots/overview.png "page overview")
# ProgressSDG
ProgressSDG is a tool for viewing global progress on the United Nations Sustainable Development Goals (SDGs). The single-page application covers 17 milestones and hundreds of indicators across environmental, social, and governance (ESG) initiatives. Using data sourced from the UN SDG API, ProgressSDG dynamically updates its main dashboard to display the goal the user wants to see. These are grouped into three sections: a summary of progress, related goal details and indicators, and  an assessment of data quality.

## Tech Stack
- Postgres database
- SQLAlchemy object relational mapper
- Python/Flask server and Jinja
- AJAX for fetching data from the db
- Chart.js for dashboard charts 
- Bootstrap UI
- Data from the UN SDG API

## Features
### 1. Summary section
The Summary section displays the SDG title, progress completion and number of years remaining to complete the goal. The progress bar and time remaining chart are built using the standard bar and pie charts from chart.js.
![alt text](https://github.com/Taiyo-SK/progressSDG/blob/main/static/screenshots/summary.png "summary section")

### 2. Details section
 The Details section shows the longform SDG description and a list of its associated indicators. The indicators are specific metrics that comprise the larger SDG, and include their own progress percentages. The list of indicators are contained in a Bootstrap table.
![alt text](https://github.com/Taiyo-SK/progressSDG/blob/main/static/screenshots/details.png "details section")

### 3. Assessment section
The Assessment section illustrates whether or not an SDG's progress data is on-track and up-to-date. It uses a custom burndown-inspired chart. The two solid lines illustrate if progress is on target, while the two dotted lines show the gap between the last progress update and 2023.
![alt text](https://github.com/Taiyo-SK/progressSDG/blob/main/static/screenshots/assessment.png "assessment section")
