FROM python:3.7
WORKDIR /app
COPY requirements.txt .
COPY . .
RUN pip3 install -r requirements.txt
CMD ["pymon", "src/index.py"]