"use strict";

//Description: This script will dynamically generate a single page application that will interact with the
//user based on thier selections within the presented choices.
//Author: Cate Speakman

$(function () {

    //this function will call the JSON file and populate the table based on the call to 
    //restful API

    //$("#categoryDropdownBtn").hide();
    $("#categoryContainer").hide();
    $("#serviceCard").hide();

    let objs;
    $.getJSON("/api/categories", function (categories) {

        objs = categories;

        for (let i = 0; i < objs.length; i++) {
            $("#categoryList").append($("<a />")
                .attr("class", "dropdown-item")
                .text(objs[i].Category)
                .attr("href", "#")
                .on('click', function (e) {
                    e.preventDefault();
                    $("#categoryName").text(objs[i].Category);
                    $("#serviceCard").hide();
                    getServicesList(objs[i].Value);
                }))//ends onclick

        }//ends for loop within getCategories

    });//ends getJSON function within getCategories


});//ends ready function


$("#homeNav").on("click", () => {
    $("#homeDiv").show();

    $("#viewCategoriesBtn").prop("disabled", false);
    $("#categoryContainer").hide();
    $("#servicesContainer").hide();
    $("#serviceCard").hide();

});//ends Home Nav onclick function

$("#servicesNav").on("click", () => {
    $("#homeDiv").hide();
    $("#servicesContainer").hide();
    getCategories();

});//ends services Nav onclick function


function getCategories() {

    //this function will populate the categories on the click of the view categories button and display 
    //the button for Select a category

    $("#homeDiv").hide();
   // $("#categoryDropdownBtn").show();
   $("#categoryContainer").show();
   


}//ends getCategories function


function getServicesList(category) {
    $("#servicesList").empty();
    $("#servicesContainer").show();


    let objs;

    $.getJSON(`/api/services/bycategory/` + category, function (services) {
        objs = services;

        for (let i = 0; i < objs.length; i++) {
            $("#servicesList").append($("<li />")
                .text(objs[i].ServiceName)
                .attr("class", "list-group-item list-group-item-action")
                .on("click", (e) => {
                    e.preventDefault();
                    $("#serviceCard").hide();
                    getService(objs[i].ServiceID);

                }))//ends arrow function
        }//ends for loop
        //this will make the section for the services display visible

    })//ends getJSON function within getServiceList

}//ends getServices function

function getService(service) {
    //this will show the card for the service that was selected from the list


    $.getJSON("/api/services/" + service, function (service) {
        $("#cardTitle").html(service.ServiceName);
        $("#cardText1").html("Service type: " + service.CategoryName);
        $("#cardText2").html("Description: " + service.Description);
        $("#cardText3").html("Length of Time: " + service.Minutes + " minutes");
        $("#cardText4").html("Cost: $" + Number(service.Price).toFixed(2));
        $("#serviceCard").show();
        $("#serviceCardContainer").show();

    })//ends getJSON function within getService

}//ends getService function