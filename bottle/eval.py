
# coding: utf-8

# In[26]:


import matplotlib.pyplot as plt
import numpy as np
import csv
import matplotlib.pylab as pylab
pylab.rcParams['figure.figsize'] = (12.0, 16.0)
pylab.rcParams['font.size'] = 24
from sklearn import preprocessing

def read_csv(file):
    x=[]
    y=[]
    z=[]
    i = 0
    with open(file,'r') as csvfile:
        bufferreader=csv.reader(csvfile,delimiter=',')
        for row in bufferreader:
            if(row != []):
                x.append([row[0], i])
                y.append([row[1], i])
                z.append([row[2], i])
                i += 1
    return np.array(x),np.array(y),np.array(z)


# In[28]:


# Create Figure and Axes instances
fig = plt.figure()

X_Vals, Y_Vals, Z_Vals = read_csv('info.txt')
print(X_Vals[:2])

min_max_scaler = preprocessing.MinMaxScaler()


# Create the Scaler object
scaler = preprocessing.StandardScaler()
# Fit your data on the scaler object
# X_Vals = np.array(X_Vals).reshape(-1, 1)
scaled_x = min_max_scaler.fit_transform(X_Vals)

ax = fig.add_subplot( 321 )
# Make your plot, set your axes labels
ax.plot(scaled_x)
ax.set_ylabel('X Values')
ax.set_xlabel('Time')

ax1 = fig.add_subplot( 323 )
# Make your plot, set your axes labels
ax1.plot(Y_Vals)
ax1.set_ylabel('Y Values')
ax1.set_xlabel('Time')

ax2 = fig.add_subplot( 325 )
# Make your plot, set your axes labels
ax2.plot(Z_Vals)
ax2.set_ylabel('z Values')
ax2.set_xlabel('Time')

X2_Vals, Y2_Vals, Z2_Vals = read_csv('info2.txt')

scaler = preprocessing.StandardScaler()
# X2_Vals = np.array(X2_Vals).reshape(-1, 1)
# Fit your data on the scaler object
scaled_x2 = min_max_scaler.fit_transform(X2_Vals)


ax3 = fig.add_subplot( 322 )
# Make your plot, set your axes labels
ax3.plot(scaled_x2)
ax3.set_ylabel('X Values')
ax3.set_xlabel('Time')

ax4 = fig.add_subplot( 324 )
# Make your plot, set your axes labels
ax4.plot(Y2_Vals)
ax4.set_ylabel('Y Values')
ax4.set_xlabel('Time')

ax5 = fig.add_subplot( 326 )
# Make your plot, set your axes labels
ax5.plot(Z2_Vals)
ax5.set_ylabel('z Values')
ax5.set_xlabel('Time')


plt.show()

