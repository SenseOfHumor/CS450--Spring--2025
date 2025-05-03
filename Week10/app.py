# from dash import Dash, dcc, html, Input, Output, callback

# app = Dash(__name__)

# #------------------------------------Layout
# app.layout = html.Div(children=[
#     html.H1("Say something nice"),
#     dcc.Input(value="", id="input_comp"),
#     html.Div(children="hello", id="output_comp"),
#     html.Div(children="hello", id="output_comp2")
# ])

# #------------------------------------Callback block starts
# @callback(
#     [Output(component_id="output_comp", 
#            component_property="children"),],
#     [Output(component_id="output_comp2",
#            component_property="children")],
#     Input(component_id="input_comp", 
#           component_property="value")
# )

# def myfunc(input_value):
#     return input_value, input_value


# #------------------------------------Callback block ends

# if __name__ == '__main__':
#     app.run(debug=True)

from dash import Dash, dcc, html, Input, Output, State

app = Dash(__name__)

app.layout = html.Div([
    html.H2("Enter text and click on the button to see how Dash State works!"),
    dcc.Input(id='input_comp', type='text'),
    html.Button('Submit', id='button',style={"margin":10}),
    html.P(id='output_comp')
])

# Write a callback function that updates the output with the input value when the button is clicked
@app.callback(
    Output('output_comp', 'children'),
    Input('button', 'n_clicks'),
    State('input_comp', 'value'),
)

def myfunc(n_clicks, input_value):
    if n_clicks is None:
        return "Enter something and click the button!"
    else:
        return f"Hello: {input_value} {str(n_clicks)}"
if __name__ == '__main__':
    app.run(debug=True)