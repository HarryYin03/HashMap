class HashMap {
    constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
    }

    // Hash function
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Resize and rehash when load factor is exceeded
    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);

        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    // Set key-value pair
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [k, v] of bucket) {
            if (k === key) {
                bucket.splice(bucket.indexOf([k, v]), 1, [key, value]);
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    // Get value by key
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }
        return null;
    }

    // Check if a key exists
    has(key) {
        return this.get(key) !== null;
    }

    // Remove a key-value pair
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [k, v] = bucket[i];
            if (k === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    // Get the number of stored keys
    length() {
        return this.size;
    }

    // Clear all entries
    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    // Get all keys
    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    // Get all values
    values() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    // Get all entries
    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                entries.push([key, value]);
            }
        }
        return entries;
    }
}

// Testing HashMap
const test = new HashMap(0.75);
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Overwrite test
test.set('apple', 'green'); // Overwrites "apple" to "green"

// Add one more to exceed load factor and resize
test.set('moon', 'silver');

// Further testing
console.log(test.get('apple')); // Should output 'green'
console.log(test.has('banana')); // Should return true
console.log(test.remove('carrot')); // Should return true
console.log(test.length()); // Should show updated length
console.log(test.clear()); // Clear all entries
console.log(test.keys()); // Should be empty
console.log(test.values()); // Should be empty
console.log(test.entries()); // Should be empty
