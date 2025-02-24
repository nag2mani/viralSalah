## 1. Users Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_id | UUID | PRIMARY KEY | Unique identifier for each user |
| linkedin_id | VARCHAR(100) | UNIQUE | LinkedIn profile identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| access_token | VARCHAR(500) | NOT NULL | LinkedIn OAuth token |
| refresh_token | VARCHAR(500) | NOT NULL | Token for refreshing access |
| created_at | TIMESTAMP | NOT NULL | Account creation timestamp |
| last_login | TIMESTAMP | NULL | Last login timestamp |

## 2. Posts Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| post_id | UUID | PRIMARY KEY | Unique identifier for each post |
| user_id | UUID | FOREIGN KEY | Reference to users table |
| linkedin_post_id | VARCHAR(100) | UNIQUE | Original LinkedIn post ID |
| content_type | ENUM | NOT NULL | 'text', 'image', 'video', 'article', 'poll' |
| content | TEXT | NOT NULL | Post content |
| posted_at | TIMESTAMP | NOT NULL | Post publication time |
| url | VARCHAR(500) | NULL | Link to the post |
| hashtags | TEXT[] | NULL | Array of hashtags used |

## 3. Post_Metrics Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| metric_id | UUID | PRIMARY KEY | Unique identifier for metrics |
| post_id | UUID | FOREIGN KEY | Reference to posts table |
| impressions | INTEGER | DEFAULT 0 | Number of times post was viewed |
| likes | INTEGER | DEFAULT 0 | Number of likes |
| comments | INTEGER | DEFAULT 0 | Number of comments |
| shares | INTEGER | DEFAULT 0 | Number of shares |
| click_through_rate | DECIMAL(5,2) | DEFAULT 0 | CTR percentage |
| engagement_rate | DECIMAL(5,2) | DEFAULT 0 | Overall engagement rate |
| tracked_at | TIMESTAMP | NOT NULL | Metrics collection timestamp |

## 4. Audience_Analytics Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| analytics_id | UUID | PRIMARY KEY | Unique identifier for analytics |
| user_id | UUID | FOREIGN KEY | Reference to users table |
| industry | VARCHAR(100) | NULL | Follower's primary industry |
| job_title | VARCHAR(100) | NULL | Follower's job title |
| company_size | VARCHAR(50) | NULL | Size of follower's company |
| location | VARCHAR(100) | NULL | Follower's location |
| count | INTEGER | NOT NULL | Number of followers in this segment |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

## 5. Content_Analysis Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| analysis_id | UUID | PRIMARY KEY | Unique identifier for analysis |
| post_id | UUID | FOREIGN KEY | Reference to posts table |
| sentiment_score | DECIMAL(3,2) | NULL | Content sentiment (-1 to 1) |
| topics | TEXT[] | NULL | Array of detected topics |
| keywords | TEXT[] | NULL | Array of key terms |
| readability_score | DECIMAL(4,2) | NULL | Content readability metric |
| tone | VARCHAR(50) | NULL | Content tone classification |

## 6. Content_Recommendations Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| recommendation_id | UUID | PRIMARY KEY | Unique identifier for recommendation |
| user_id | UUID | FOREIGN KEY | Reference to users table |
| topic | VARCHAR(100) | NOT NULL | Suggested content topic |
| content_type | ENUM | NOT NULL | Recommended format |
| suggested_hashtags | TEXT[] | NULL | Recommended hashtags |
| best_posting_time | TIME | NULL | Optimal posting time |
| best_posting_day | VARCHAR(20) | NULL | Optimal posting day |
| confidence_score | DECIMAL(3,2) | NOT NULL | Recommendation confidence |
| created_at | TIMESTAMP | NOT NULL | Recommendation generation time |

## 7. Competitor_Analysis Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| competitor_id | UUID | PRIMARY KEY | Unique identifier for competitor |
| user_id | UUID | FOREIGN KEY | Reference to users table |
| linkedin_profile_url | VARCHAR(500) | NOT NULL | Competitor's LinkedIn URL |
| company_name | VARCHAR(200) | NOT NULL | Competitor's company name |
| post_frequency | INTEGER | NULL | Average posts per week |
| engagement_rate | DECIMAL(5,2) | NULL | Average engagement rate |
| top_content_types | TEXT[] | NULL | Most successful content types |
| tracked_since | TIMESTAMP | NOT NULL | Tracking start date |

## Relationships and Constraints

1. Users → Posts (One-to-Many)
2. Posts → Post_Metrics (One-to-Many)
3. Users → Audience_Analytics (One-to-Many)
4. Posts → Content_Analysis (One-to-One)
5. Users → Content_Recommendations (One-to-Many)
6. Users → Competitor_Analysis (One-to-Many)

## Indexes

1. Users: linkedin_id, email
2. Posts: user_id, posted_at
3. Post_Metrics: post_id, tracked_at
4. Audience_Analytics: user_id, industry
5. Content_Analysis: post_id
6. Content_Recommendations: user_id, created_at
7. Competitor_Analysis: user_id, company_name