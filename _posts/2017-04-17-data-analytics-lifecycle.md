---
layout: post
title: "Data Analytics lifecycle for organisations"
published: true
date: 2017-04-17
categories: blog
tags: [data, analytics]
excerpt_separator: <!--more-->
comments: true
share: true
---

# An organisation's journey to data analytics

Every organisation has data. Data Analytics empower organisations to leverage this data and provide answers to their biggest business challenges. Setting up data analytics is a daunting task <!--more-->
 and we could easily run into roadblocks. The following approach explain the order in organisations should setup data analytics, these should occur in sequence.

![framework flow]({{ site.url }}/images/ml-framework.png){: .pull-center}

## Data Exploration

Data exploration is about exploring what's available in the data:

* what variables are in the data
* any missing observations
* relationships in the data
* patterns in the data
* dependencies to other datasets
* is the data complete for the purpose of analysis

What do you need for for data exploration stage:

* statistics knowledge
* visualisation tools
* Business Analyst

## Data Preparation

This stage is about collecting, integrating and aggregating data into a single file, data table or database so it is ready for analytics:

* fix errors in data (sometimes a.k.a. cleaning data)
* fill in nulls and/or incomplete data
* merge/join data from various sources or formats

This stage is normally very time consuming, you'd allocate:

* IT specialist(s) working closely with a Business Analyst(s)

An important example of cleaning the data is seen with US states - where a state could be represented by various values, for example North Carolina by "NC" or "N.C.".

## Model Development

This stage is about developing an analytical data model that attempts to solve a specific business problem. Business problems vary from organisation to organisation. Analytical data models have the ability to uncover hidden opportunities in data and are considered funcamental to success of businesses. Some common challenges that analytics are used to examine are:

* Customer retention
* Customer attrition/churn
* Fraud detection
* Credit scoring
* Anti-money laundering
* Clinical trials
* Demand forecasting
* Loss prevention

Model development is a very complex task and organisations usually engage the following expertise durin this stage:

* data modelers
* data architects
* data scientists
* Business Analysts

## Model Deployment

This stage is about deploying the model to make predictions about data that is yet to happen. Its usually done through a scoring engine that operates on the data model and feeds in new data to make predictions that count towards a score. 


The source of this post is this book [Leaders and Innovators: How Data-Driven Ogranizations are Winning with Analytics](http://au.wiley.com/WileyCDA/WileyTitle/productCd-1119232570.html). This post sets the scene for my future work. It provides sort of a big picture where the cycle of machine learning fits. 
