# Project Proposal

MobilWorth Indonesia is a machine learning demo for estimating Indonesian
used-car listing prices from structured vehicle attributes.

## Dataset Fields

- Brand
- Model
- Year
- Mileage in kilometers
- Transmission type
- Fuel type
- Engine displacement in CC
- Body type
- Color
- Location
- Listed price in IDR

## Model Plan

The planned primary model is a Random Forest Regressor, with Linear Regression
and Gradient Boosting Regressor used as comparison baselines.

## Evaluation Metrics

- MAE for average prediction error in IDR
- RMSE for larger-error sensitivity
- R squared for explained price variance
