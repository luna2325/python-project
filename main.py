from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/check-winner', methods=['POST'])
def save_image():
    data = request.get_json()
    user = int(data['current_values'].get('user'))
    computer = int(data['current_values'].get('computer'))
    print(user)
    print(computer)
    if user < computer:
        return redirect("lose")
    elif user == computer:
        return redirect("tie")
    else:
        return redirect("win")

@app.route('/win')
def win():
    return render_template("win.html")

@app.route('/lose')
def lose():
    return render_template("lose.html")

@app.route('/tie')
def tie():
    return render_template("tie.html")

if __name__ == "__main__":
    app.run(debug=True)