#include<iostream>
#include<vector>
#include<climits>
#include<algorithm>
#include<unordered_map>
#include <math.h>
using namespace std;

int countTrips(int n, vector<vector<int>> & loc)
{
    unordered_map<int,int> mymap1;
    unordered_map<int,int> mymap2;
    unordered_map<int,int> mymap3;
    unordered_map<int,int> mymap4;
    unordered_map<int,int> mymap5;
    unordered_map<int,int> mymap6;
    for(int i=0;i<n;i++)
    {
        double x=loc[i][0];
        double y=loc[i][1];
        double result;

        if(x==0 && y!=0)
        {
            mymap5[y]++;
        }
        if(y==0 && x!=0)
        {
            mymap6[x]++;
        }
        

        if(x>0 && y>0)
        {
            double result = round((y / x) * 1000) / 1000;
            mymap1[result]++;
        }
        else if(x>0 && y<0)
        {
            double result = round((y / x) * 1000) / 1000;
            mymap2[result]++;
        }
        else if(x<0 && y>0)
        {
            double result = round((y / x) * 1000) / 1000;
            mymap3[result]++;
        }
        else if(x<0 && y<0)
        {
            double result = round((y / x) * 1000) / 1000;
            mymap4[result]++;
        }
    }

    int res=mymap1.size() + mymap2.size()+ mymap3.size() + mymap4.size() + mymap5.size() + mymap6.size();
    return res;
}

int main()
{
    // int n=5;
    // vector<vector<int>> loc={{0,0},{1,2},{2,4},{-3,6},{-1,-2}};
    // int n=5;
    // vector<vector<int>> loc={{0,0},{1,2},{2,4},{-3,6},{4,8}};
    // int n=5;
    // vector<vector<int>> loc={{10,7},{9,7},{-2,-3},{-5,9},{2,-4}};
    // int n=7;
    // vector<vector<int>> loc={{-4,-2},{5,9},{-5,-5},{-4,5},{-2,2},{5,-5},{3,7}};
    // int n=6;
    // vector<vector<int>> loc={{-3,6},{-4,3},{4,9},{9,5},{-1,6},{0,5}};
    int n=5;
    vector<vector<int>> loc={{8,5},{6,-4},{8,4},{1,2},{0,4}};

    cout<<countTrips(n,loc);


    // double x=4;
    // double y=2;
    // double result = round((x / y) * 1000) / 1000;
    // cout<<result;


   return 0;
}