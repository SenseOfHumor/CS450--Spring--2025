# # # from dash import Dash, html, dcc
# # # import pandas as pd
# # # import plotly.express as px

# # # app = Dash(__name__)

# # # # Load the tips dataset
# # # tips_df = pd.read_csv("tips.csv").dropna()

# # # fig = px.scatter(x=tips_df.total_bill, y=tips_df.tip,template='simple_white')

# # # #------------------------------------Graph component
# # # app.layout = dcc.Graph(figure=fig)


# # # if __name__ == '__main__':
# # #     app.run(debug=True)


# # import dash
# # from dash import dcc, html
# # from dash.dependencies import Input, Output

# # app = dash.Dash(__name__)

# # options = ['Option 1', 'Option 2', 'Option 3']

# # #------------------------------------Dropdown
# # app.layout = html.Div(
# #     [dcc.Dropdown(options=options, value="Option 1", id="myd"),
# #     html.P(id='myp')]
# # )


# # #------------------------------------Callback block starts
# # @app.callback(Output("myp","children"), Input("myd", "value"))

# # def myfunc(val):
# #     return f"Hello {val}"


# # #------------------------------------Callback block ends

# # if __name__ == '__main__':
# #     app.run(debug=True)


# from dash import Dash, dcc, html, Input, Output
# import plotly.express as px
# import pandas as pd

# # Load the tips dataset
# tips_df = pd.read_csv("tips.csv").dropna()

# app = Dash(__name__)
# drop_down_options=tips_df['time'].unique()

# # Create the layout of the app
# app.layout = html.Div(
#     children=[
#         dcc.Dropdown(
#             id='dropdown-comp',
#             options=drop_down_options,
#             value=drop_down_options[0],
#             style={'width': '250px'}
#         ),
#         dcc.Graph(id='graph_comp',style={'width': 650,'height':400})
#     ]
# )

# #------------------------------------Callback block starts
# @app.callback(Output("graph_comp", "figure"), Input("dropdown-comp", "value"))

# def myfunc(val):

#     filtered_df = tips_df[tips_df.time ==val]  ## returns a boolean series


#     return px.scatter(
#         filtered_df,
#         x = "total_bill",
#         y = "tip",
#         template = 'simple_white'
#     ).update_layout({"transition_duration": 500})


# #------------------------------------Callback block ends

# if __name__ == '__main__':
#     app.run(debug=True)


from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import pandas as pd

# Load the tips dataset
tips_df = pd.read_csv("tips.csv").dropna()

avg_tip_by_day = tips_df.groupby('day')['tip'].mean().reset_index()
fig_barchart = px.bar(avg_tip_by_day, x='day', y='tip', title="Average Tip by Day", template='simple_white')
fig_barchart.update_layout({'title_x': 0.5, 'transition_duration': 500}).update_traces(marker={'color': 'gray'})

app = Dash(__name__)

# Define the layout of the app
app.layout = html.Div(className="parent", children=[
    html.Div(className="child1", children=[
        dcc.Graph(id='bar_chart_comp', figure=fig_barchart,style={"width": "100%"})
    ]),

    html.Div(className="child2", children=[
        html.Div(className="child21", children=[
            dcc.Dropdown(
                id='day_dropdown_comp',
                options=tips_df['day'].unique(),
                value=tips_df['day'].unique()[0],
                clearable=False,
                style={"width": "100%"}
            )
        ]),
        html.Div(className="child22", children=[
            dcc.Graph(id='scatter_plot_comp',style={"width": "100%"})
        ])
    ]),
])

@app.callback(
    Output('scatter_plot_comp', 'figure'),
    Input('day_dropdown_comp', 'value')
)
def update_total_bill_vs_tip_chart(selected_day):
    filtered_df = tips_df[tips_df['day'] == selected_day]
    fig = px.scatter(filtered_df, x='total_bill', y="tip", title="Total Bill vs Tip", template='simple_white')
    fig.update_layout({'title_x': 0.5, 'transition_duration': 500})
    fig.update_traces(marker={'color': 'gray', 'size': 10, 'opacity': 0.6})
    return fig

if __name__ == '__main__':
    app.run(debug=True)
