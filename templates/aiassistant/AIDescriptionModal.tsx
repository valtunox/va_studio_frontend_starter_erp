/**
 * AI Description Modal Component
 * Interactive modal for generating Terraform infrastructure-as-code for AWS EC2 instances. Accepts user inputs (instance name, type, region) 
 * and generates complete Terraform configurations including security groups, AMI selection, and user data scripts with explanations.
 */
import React, { useState } from 'react';

interface AIDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIDescriptionModal: React.FC<AIDescriptionModalProps> = ({ isOpen, onClose }) => {
  const [instanceName, setInstanceName] = useState('');
  const [instanceType, setInstanceType] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ terraformCode: string; explanation: string } | null>(null);

  const handleGenerate = () => {
    if (!instanceName.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    // Pure demo simulation - no API calls
    setTimeout(() => {
      const terraformCode = `# Terraform configuration for EC2 instance
provider "aws" {
  region = "${region || 'us-east-1'}"
}

# Security Group
resource "aws_security_group" "${instanceName.toLowerCase().replace(/\s+/g, '_')}_sg" {
  name_prefix = "${instanceName}-sg"
  description = "Security group for ${instanceName}"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${instanceName}-security-group"
  }
}

# EC2 Instance
resource "aws_instance" "${instanceName.toLowerCase().replace(/\s+/g, '_')}" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "${instanceType || 't3.micro'}"
  vpc_security_group_ids = [aws_security_group.${instanceName.toLowerCase().replace(/\s+/g, '_')}_sg.id]
  
  tags = {
    Name = "${instanceName}"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nginx
              systemctl start nginx
              systemctl enable nginx
              EOF
}

# Data source for Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Outputs
output "instance_id" {
  value = aws_instance.${instanceName.toLowerCase().replace(/\s+/g, '_')}.id
}

output "public_ip" {
  value = aws_instance.${instanceName.toLowerCase().replace(/\s+/g, '_')}.public_ip
}

output "public_dns" {
  value = aws_instance.${instanceName.toLowerCase().replace(/\s+/g, '_')}.public_dns
}`;

      setResult({
        terraformCode,
        explanation: `Generated Terraform configuration for "${instanceName}" EC2 instance with ${instanceType || 't3.micro'} instance type in ${region || 'us-east-1'} region. Includes security group with SSH, HTTP, and HTTPS access, and Ubuntu 22.04 AMI with nginx pre-installed.`,
      });
      setLoading(false);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <h2 className="text-xl font-bold mb-4 text-blue-700">Generate Terraform Code for EC2 Instance</h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Instance Name (e.g., web-server)"
          value={instanceName}
          onChange={e => setInstanceName(e.target.value)}
        />
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Instance Type (e.g., t3.micro, t3.small)"
          value={instanceType}
          onChange={e => setInstanceType(e.target.value)}
        />
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="AWS Region (e.g., us-east-1, us-west-2)"
          value={region}
          onChange={e => setRegion(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-all"
          onClick={handleGenerate}
          disabled={loading || !instanceName}
        >
          {loading ? 'Generating...' : 'Generate Terraform Code'}
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {result && (
        <div className="mt-6">
          <h3 className="font-bold text-blue-700 mb-2">Generated Terraform Code</h3>
          <div className="bg-gray-900 text-green-400 rounded p-3 mb-3 text-sm font-mono overflow-x-auto whitespace-pre">{result.terraformCode}</div>
          <h4 className="font-semibold text-blue-600 mb-1">Explanation</h4>
          <div className="bg-blue-50 border border-blue-200 rounded p-2 text-gray-700 text-sm">{result.explanation}</div>
        </div>
      )}
    </div>
  );
};

export default AIDescriptionModal; 