p = ["burak", "sam", "akhil", "tom", "burak", "john", "sam"]
x = []
y = []
for i in p:
    if not i in x:
        x.append(i)
    else:
        y.append(i)
print(y)